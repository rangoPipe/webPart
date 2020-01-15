import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { SubspaceProvider } from "react-redux-subspace";
import { IColumn, Selection, ICommandBarItemProps, PrimaryButton, DefaultButton, MessageBarType, CheckboxVisibility, DialogFooter, IGroup } from "office-ui-fabric-react";

import Page from "./page";

import { BaseService } from "../../../../../common/classes/baseService";
import { ColumnRecordArchivist } from "../../../../../interface/trasnfer/archivist/archivistResult";
import { apiTransferencia } from "../../../../../common/connectionString";

import { IIOIPStore } from "../../../../../redux/namespace";
import store from "../../../../../redux/store";
import { IPendingProps, IPendingState } from "./IPendingProps";
import { PendingNameSpace } from "../../../../../enum/archivist/archivistEnum";

import { selectRowItem, createDetailList, loadDetailList } from "../../../../../redux/actions/general/detailList/_actionName";
import { createCommandBar } from "../../../../../redux/actions/general/commandBar/_actionName";
import { createTextField, changeTextField } from "../../../../../redux/actions/general/textField/_actionName";
import { createDialog } from "../../../../../redux/actions/general/dialog/_actionName";
import { createMessageBar } from "../../../../../redux/actions/general/messageBar/_actionName";


import TextField from "../../../../../general/textField";
import MessageBar from "../../../../../general/messageBar";
import { RecordState } from "../../../../../enum/RecordState";
import { TransferResultDTO, TransferDTO, TransferResult, TransferFilter } from "../../../../../interface/trasnfer/transferResult";


class PendingClass extends React.Component<IPendingProps, IPendingState>  {

  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListPendingArchivist, PendingNameSpace.detailList)(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarPendingArchivist, PendingNameSpace.commandBar)(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogPendingArchivist, PendingNameSpace.dialog)(store);
  /** @private */ private _messageBarController = subspace( (state: IIOIPStore) => state.messageBarPendingArchivist, PendingNameSpace.messageBar)(store);
  /** @private */ private _textAreaController = subspace( (state: IIOIPStore) => state.textAreaPendingArchivist, PendingNameSpace.textArea)(store);

  /** @private */ private _footerDialogDefault: any;
  /** @private */ private _bodyDialogDefault: any;

  private _http: BaseService = new BaseService();
  private _selection: Selection;

    constructor(props:IPendingProps) {
       super(props);

       this._selection = new Selection({

        onSelectionChanged: () => {
          let items,
            farItems = [];
  
          this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });
  
          if (this._selection.getSelectedCount() > 0) {
            items = this._createMenuButtons();
            farItems = this._createFarMenuButtons();
          }
  
          this._commandBarController.dispatch({
            type: createCommandBar,
            payload: {
              items,
              farItems
            }
          });
       }});
       
       this._detailListController.dispatch({
         type: createDetailList,
         payload: {
          items: [],
          columns: this._createColumns(),
          checkboxVisibility: CheckboxVisibility.always,
          selection:this._selection
         }
       });

       this._textAreaController.dispatch({ type: createTextField, payload: {        
        label: "Motivo: ",
        multiline: true,
        rows: 3,
        onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          this._textAreaController.dispatch({ type:changeTextField, payload: newValue});
        }
      }});

      this._footerDialogDefault = (
        <div>
          <DialogFooter>
            <DefaultButton onClick={this._onClose} text="Cerrar" />
          </DialogFooter>
        </div>
      );
      this._bodyDialogDefault = (
        <div>
          <SubspaceProvider mapState={(state: IIOIPStore) => {  return { messageBar: state.messageBarPendingArchivist }; }} >
            <MessageBar />
          </SubspaceProvider>
        </div>
      );

    }

    /**
   * Retorna un arreglo de tipo IColumn para el DetailList
   * @private @returns {IColumn[]} Un arreglo de columnas para el DetailList
   */
    private _createColumns = (): IColumn[] => {
      const dateFormat = "YYYY/MM/DD";
      const columns: IColumn[] = [
        {
          key: "nroExpediente",
          name: "N° Expediente",
          fieldName: "nroExpediente",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth: 150,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.nroExpediente}</span>;
          }
        },
        {
          key: "name",
          name: "Titulo expediente",
          fieldName: "name",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.name}</span>;
          }
        },
        {
          key: "serie",
          name: "Serie",
          fieldName: "serie",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.serie}</span>;
          }
        },
        {
          key: "subserie",
          name: "Subserie",
          fieldName: "subserie",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{item.subserie}</span>;
          }
        },
        {
          key: "endDate",
          name: "Última fecha de modificación",
          fieldName: "endDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: ColumnRecordArchivist) => {
            return <span>{moment(item.endDate).format(dateFormat)}</span>;
          }
        }
      ];

      return columns;
    }

    /**
   * Retorna un arreglo de ICommandBarItemProps para el menu principal
   * @returns {ICommandBarItemProps[]} Arreglo de botones
   * @public
   */
    public _createMenuButtons = (): ICommandBarItemProps[] => {
      return [
        {
          key: "aprove",
          name: "Aprobar",
          iconProps: {
            iconName: "Like"
          },
          onClick: () => {
            this._onHideMessage();
            this._createDialog(
              "Esta Seguro ?",
              "Desea aprobar los expedientes seleccionados ?",
              this._bodyDialogDefault,
              <div>
                <DialogFooter>
                  <PrimaryButton onClick={this._onAcceptAprove } text="Aceptar" />
                  <DefaultButton onClick={this._onClose} text="Cancelar" />
                </DialogFooter>
              </div>
            );
          }
        },
        {
          key: "reject",
          name: "Devolver",
          iconProps: {
            iconName: "FileRequest"
          },
          onClick: () => {
            this._onHideMessage();
            this._textAreaController.dispatch({
              type: createTextField,
              payload: {
                label: "Motivo: ",
                multiline: true,
                rows: 3,
                disabled: false,
                defaultValue: undefined,
                value: undefined
              }
            });
            this._createDialog(
              "Esta Seguro ?",
              "Desea rechazar los expedientes seleccionados ?",
              <div>
                <SubspaceProvider mapState={(state: IIOIPStore) => {  return { messageBar: state.messageBarPendingArchivist }; }} >
                  <MessageBar />
                </SubspaceProvider>
                <SubspaceProvider mapState={(state: IIOIPStore) => { return { textField: state.textAreaPendingArchivist }; }} >
                  <TextField />
                </SubspaceProvider>
              </div>,
              <div>
                <DialogFooter>
                  <PrimaryButton onClick={this._onAcceptReject} text="Aceptar" />
                  <DefaultButton onClick={this._onClose} text="Cancelar" />
                </DialogFooter>
              </div>
            );
          }
        },
        {
          key: "finish",
          name: "Finalizar",
          iconProps: {
            iconName: "ReleaseDefinition"
          },
          onClick: () => {
            this._onHideMessage();
            this._createDialog(
              "Esta Seguro ?",
              "Desea enviar los expedientes aprobados a Archivo Central ?"
            );
          }
        }
      ];
    }

    /**
     * Retorna un arreglo de ICommandBarItemProps para el menu secundario
     * @returns {ICommandBarItemProps[]} Arreglo de botones
     * @public
     */
    public _createFarMenuButtons = (): ICommandBarItemProps[] => {
      return [
        {
          key: "info",
          name: "Información",
          ariaLabel: "info",
          iconProps: {
            iconName: "Info"
          },
          iconOnly: true,
          onClick: () => console.log("Info")
        }
      ];
    }

    /**
     * Se inicializa el componente dialog en el store.
     * @param {string} title Titulo del dialog.
     * @param {string} subText Tipo del dialog.
     * @param {any} body Elemento HTML para el cuerpo del dialog.
     * @param {any} footer Elemento HTML para el pie de pagina del dialog.
     * @event @private
     */
    private _createDialog = (
      title: string,
      subText: string,
      body: any = this._bodyDialogDefault,
      footer: any = this._footerDialogDefault
    ) => {
      this._dialogController.dispatch({
        type: createDialog,
        payload: {
          title,
          subText,
          hideDialog: false,
          body,
          footer
        }
      });
    }

    /**
     * Modifica el estado del componente Dialog en el store.
     * @param {string} message Mensaje a mostrar en el dialog.
     * @param {MessageBarType} type Tipo del dialog.
     * @param {boolean} truncated Texto comprimido en una linea.
     * @event @private
     */
    private _onShowMessage = (  message: string, type: MessageBarType = MessageBarType.info, truncated: boolean = false ) => {
      this._messageBarController.dispatch({
        type: createMessageBar,
        payload: {
          messageBarType: type,
          value: message,
          hideMessage: false,
          truncated
        }
      });
    }

    /**
     * Reinicializa el estado del componente Dialgo en el store.
     * @event @private
     */
    private _onHideMessage = () => {
      this._messageBarController.dispatch({
        type: createMessageBar,
        payload: {
          messageBarType: MessageBarType.info,
          value: undefined,
          hideMessage: true
        }
      });
    }

    /**
     * Crea los grupos al momento de visualizar el listado de expedientes.
     * @private
     */
    private _createGroups = (data: ColumnRecordArchivist[]) => {
      try {
        let key: string = "", groups: IGroup[] = [];
        data.forEach((x: ColumnRecordArchivist, i: number) => {
          if (key !== `${x.nombreSeccion}_${x.nombreUsuario}`) {
            key = `${x.nombreSeccion}_${x.nombreUsuario}`;

            const count = data.filter( (y: ColumnRecordArchivist) => y.nombreSeccion === x.nombreSeccion && y.nombreUsuario === x.nombreUsuario ).length;
            groups.push({
              key,
              name: `Área: ${x.nombreSeccion} Usuario: ${x.nombreUsuario}"`,
              startIndex: i,
              count,
              isCollapsed: true
            });
          }
        });

        this._detailListController.dispatch({
          type: createDetailList,
          payload: {
            enableShimmer: false,
            items: data,
            groups,
            groupProps: {
              showEmptyGroups: true,
              collapseAllVisibility: true,
              checkboxVisibility: CheckboxVisibility.always
            }
          }
        });
      } catch (error) {}
    }

  /**
   * Ejecuta aprobacion para los expedientes.
   * @event @private
   */
  private _onAcceptAprove = async () => {
    const response = this._sendRequest( RecordState.AprobadoEnAC );
    if (response) {
      response.then((data:TransferResult) => {
        this._onShowMessage(data.message,(data.success) ? MessageBarType.success : MessageBarType.error, (data.success));
        this._loadData(RecordState.AprobadoParaAC);
      });
    }
  }

  /**
   * Ejecuta rechazo para los expedientes.
   * @event @private
   */
  private _onAcceptReject = async () => {
    let motive: string = this._textAreaController.getState().value;
    if (!motive || motive.trim().length === 0) {
      this._onShowMessage("Por favor indique un motivo", MessageBarType.warning);
      return;
    }

    const response = this._sendRequest(RecordState.RechazadoEnAC);
    if (response) {
      response.then((data:TransferResult) => {
        this._onShowMessage(data.message,(data.success) ? MessageBarType.success : MessageBarType.error, (data.success));
        this._loadData(RecordState.AprobadoParaAC);
      });
    }
  }

  /**
   * Ejecuta clausura del componente Dialog.
   * @event @private
   */
  private _onClose = () => {
    this._dialogController.dispatch({
      type: createDialog,
      payload: {
        hideDialog: true
      }
    });
  }  

  /**
   * Asigna detalle de expedientes pedientes al DetailList
   * @param {TransferDTO[]} items Listado de items
   * @private
   */
  private _setDataPending = (items: TransferDTO[]) => {
    try {      
      let data: ColumnRecordArchivist[] = items.map((x: TransferDTO) => {
        return {
          nombreUsuario: x.nombreUsuario,
          nombreSeccion: x.nombreSeccion,
          key: x.idExpediente,
          name: x.name,
          nroExpediente: x.code,
          serie: x.nombreSerie,
          subserie: x.nombreSubserie,
          initialDate: x.dateIn,
          endDate: x.dateOut
        };
      });      

      this._createGroups(data);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * Caraga la el detalle de expedientes 
   * @param {RecordState} recordState Estado de los expedientes a visualizar.
   */
  private _loadData = (recordState: RecordState): void => {
    try {
      let body: TransferFilter = {
        state: [recordState]
      };

      this._http.FetchPost(`${apiTransferencia}/Api/Record/RecordExpired`, body).then((_response:TransferResultDTO) => {      
        if(_response) {
          this._setDataPending(_response.result);
        }
      })      
      .catch(err => {
        console.log(err);          
        this._detailListController.dispatch({ type: loadDetailList, payload: [] });
      });
      
    } catch (error) {
      console.log(error);      
      return undefined;
    }
  }

  /**
   * Modifica el estado de los expedientes segun el estado.
   * @param {RecordState} recordState Nuevo estado de los expedientes seleccionados.
   * @event @private
   */
  private _sendRequest = (recordState: RecordState ) => {
    try {      
      const { selectedItems } = this._detailListController.getState();
      if (selectedItems.length === 0) {
        this._onShowMessage("Seleccione al menos un elemento");
        return;
      }

      this._createDialog("Procesando...", "Procesando información");

      let body: TransferFilter = {
        record: [],
        state: [recordState]
      };

      if (recordState === RecordState.RechazadoEnAC) {
        body.description = this._textAreaController.getState().value;
      }

      selectedItems.map((x: ColumnRecordArchivist) => {
        return body.record!.push({
          idExpediente: x.key
        });
      });

      return this._http.FetchPost(`${apiTransferencia}/Api/Record/MoveRecordExpired`, body);

    } catch (error) {
      this._onShowMessage(error, MessageBarType.error, true);
      return undefined;
    }
  }

  /**
   * El componentDidMount() es llamado despues de renderizar el componente.
   */
  public async componentDidMount() {
    this._loadData(RecordState.AprobadoParaAC);    
  }

  public render(): JSX.Element {
    return <Page />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
    return {
      detailList: state.detailList
    };
  };
  
  /**
   * Conecta el componente con el store de Redux
   * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
   */
  export default connect(mapStateToProps)(PendingClass);
  