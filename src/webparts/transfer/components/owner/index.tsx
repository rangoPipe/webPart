// Terceros
import * as React from "react";
import * as moment from "moment";
import { Selection, ICommandBarItemProps, MessageBarType, DialogFooter, PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import { subspace } from "redux-subspace";
import { WebPartContext } from "@microsoft/sp-webpart-base";

import { RecordState } from "../../../../enum/RecordState";
import Page from "./page";

//Redux
import store from "../../../../redux/store";
import { IIOIPStore } from "../../../../redux/namespace";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";

//Componentes
import TextField from "../../../../general/textField";
import MessageBar from "../../../../general/messageBar";

//Propios
import { apiTransferencia } from "../../../../common/connectionString";
import { MoveRecordDTO } from "../../../../interface/trasnfer/moveRecordDTO";
import { ColumnRecordOwner, IOwnerProps, IOwnerState } from "./ownerProps";
import { ApiRecordItem } from "../../../../common/classes/apiRecordItem";

//import { OwnerMenu } from "./menu";
import { OwnerNameSpace } from "../../../../enum/owner/ownerEnum";
import { BaseService } from "../../../../common/classes/baseService";
import { SubspaceProvider } from "react-redux-subspace";
import { createMessageBar } from "../../../../redux/actions/general/messageBar/_actionName";
import { createDialog, hideDialog } from "../../../../redux/actions/general/dialog/_actionName";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";

/**
 * @class Clase OwnerMain contenedor principal del propietario.
 */
export default class OwnerMain extends React.Component<IOwnerProps, IOwnerState> {
  /** @private */ private _contextController = subspace( (state: IIOIPStore) => state.context, OwnerNameSpace.context )(store);
  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListOwner, OwnerNameSpace.detailListOwner )(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarOwner, OwnerNameSpace.commandBarOwner )(store);
  /** @private */ private _messageBarController = subspace( (state: IIOIPStore) => state.messageBarOwner, OwnerNameSpace.messageBarOwner )(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogOwner, OwnerNameSpace.dialogOwner )(store);
  /** @private */ private _textFieldController = subspace( (state: IIOIPStore) => state.textAreaOwner, OwnerNameSpace.textAreaOwner )(store);

  /** @private */ private _context: WebPartContext;
  /** @private */ private _selection: Selection;
  /** @private */ private _footerDialogDefault: any;
  /** @private */ private _bodyDialogDefault: any;
  /** @private */ private _http: BaseService = new BaseService();

  /**
   * Crea una instancia de OwnerMain.
   * @param {IOwnerProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IOwnerProps) {
    super(props);

    this._footerDialogDefault = (
      <div>
        <DialogFooter>
          <DefaultButton onClick={this._onClose} text="Cerrar" />
        </DialogFooter>
      </div>
    );
    this._bodyDialogDefault = (
      <div>
        <SubspaceProvider mapState={(state: IIOIPStore) => { return { messageBar: state.messageBarOwner }; }} >
          <MessageBar />
        </SubspaceProvider>
      </div>
    );

    this._selection =  new Selection({
      onSelectionChanged: () => {    

        let items, farItems = [];

        this._detailListController.dispatch({
          type: selectRowItem,
          payload: this._selection.getSelection()
        });

        if(this._selection.getSelectedCount() > 0) {
          items = this._getItems();
          farItems = this._getFarItems();
        }
        
        this._commandBarController.dispatch({type: createCommandBar, payload:{
          items,
          farItems
        }});

      }
    });

    this._detailListController.dispatch({
      type: createDetailList,
      payload: {
        columns: this._createColumns(),
        selection: this._selection
      }
    });

    this._context = this._contextController.getState().context;
  }

  /**
   * Retorna un arreglo de tipo IColumn para el DetailList
   * @returns {IColumn[]} Un arreglo de columnas para el DetailList
   */
  private _createColumns = () => {
    const dateFormat = "YYYY/MM/DD";
    return [
      {
        key: "count",
        name: "N°",
        fieldName: "count",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 30,
        maxWidth: 30,
        onRender: (item: ColumnRecordOwner) => {
          return <span>{item.count}</span>;
        }
      },
      {
        key: "nroExpediente",
        name: "N° Expediente",
        fieldName: "nroExpediente",
        isResizable: true,
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
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
        onRender: (item: ColumnRecordOwner) => {
          return <span>{moment(item.endDate).format(dateFormat)}</span>;
        }
      }
    ];
  }

  /**
   * Modifica el estado del componente Dialog en el store.
   * @param {string} message Mensaje a mostrar en el dialog.
   * @param {MessageBarType} type Tipo del dialog.
   * @param {boolean} truncated Texto comprimido en una linea.
   * @event @private
   */
  private _showMessage = ( message: string, type: MessageBarType = MessageBarType.info, truncated: boolean = false ) => {
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
  private _hideMessage = () => {
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
   * Ejecuta clausura del componente Dialog.
   * @event @private
   */
  private _onClose = () => {
    this._dialogController.dispatch({  type: hideDialog, payload: true  });
  }

  /**
   * Ejecuta aprobacion para los expedientes.
   * @event @private
   */
  private _onAcceptAprove = () => {
    this._changeState(RecordState.AprobadoParaAC);
  }

  /**
   * Ejecuta rechazo para los expedientes.
   * @event @private
   */
  private _onAcceptReject = () => {
    let motive: string = this._textFieldController.getState().value;
    if (!motive || motive.trim().length === 0) {
      this._showMessage(  "Por favor indique un motivo",  MessageBarType.warning, true );
      return;
    }

    this._changeState(RecordState.PospuestoParaAC);
  }

  /**
   * Modifica el estado de los expedientes segun el estado.
   * @param {RecordState} recordState Nuevo estado de los expedientes seleccionados.
   * @event @private
   */
  private _changeState = async (recordState: RecordState) => {
    try {
      const { selectedItems } = this._detailListController.getState();

      if (selectedItems.length === 0) {
        this._showMessage( "Seleccione al menos un elemento", MessageBarType.info );
        return;
      }

      this._createDialog("Procesando...", "Procesando información");

      let body: MoveRecordDTO = {
        Record: [],
        IdUsuario: 1,
        State: [recordState]
      };

      if (recordState === RecordState.PospuestoParaAC) {
        body.Description = this._textFieldController.getState().value;
      }

      selectedItems.map((x: ColumnRecordOwner) => {
        return body.Record!.push({
          idExpediente: x.key
        });
      });

      this._http.FetchPost(`${apiTransferencia}/Api/Record/MoveRecordExpired`, body)
      .then((_response:any) => {
        

        if (_response.result) {
          this._dialogController.dispatch({
            type: createDialog,
            payload: {
              hideDialog: true
            }
          });
          this._showMessage(_response.message, MessageBarType.success);
          window.location.reload();
        } else {
          this._showMessage(_response.message, MessageBarType.error, true);
        }
      })
      .catch(err => {
        console.log(err);
        this._showMessage(err, MessageBarType.error, true);    
      });
    } catch (error) {
      this._showMessage(error, MessageBarType.error, true);
    }
  }

  /**
   * Retorna un arreglo de ICommandBarItemProps para el menu principal
   * @returns {ICommandBarItemProps[]} Arreglo de botones
   * @private
   */
  public _getItems = (): ICommandBarItemProps[] => {
    return [
      {
        key: "aprove",
        name: "Solicitar transferencia",
        iconProps: {
          iconName: "Like"
        },
        onClick: () => {
          this._hideMessage();
          this._createDialog(
            "Esta Seguro ?",
            "Desea solicitar transferencia para los expedientes seleccionados ?",
            this._bodyDialogDefault,
            <div>
              <DialogFooter>
                <PrimaryButton onClick={this._onAcceptAprove} text="Aceptar" />
                <DefaultButton onClick={this._onClose} text="Cancelar" />
              </DialogFooter>
            </div>
          );
        }
      },
      {
        key: "reject",
        name: "Posponer",
        iconProps: {
          iconName: "WorkFlow"
        },
        onClick: () => {
          this._hideMessage();
          this._textFieldController.dispatch({
            type: createTextField,
            payload: {
              label: "Motivo: ",
              multiline: true,
              rows: 3,
              disabled: false,
              defaultValue: undefined,
              value: undefined,
              onChange: (e, newValue:string) => this._textFieldController.dispatch({type: changeTextField, payload: newValue}) 
            }
          });
          this._createDialog(
            "Esta seguro ?",
            "Desea posponer los expedientes seleccionados ?",
            <div>
              <SubspaceProvider mapState={(state: IIOIPStore) => { return { messageBar: state.messageBarOwner }; }}>
                <MessageBar />
              </SubspaceProvider>
              <SubspaceProvider  mapState={(state: IIOIPStore) => { return { textField: state.textAreaOwner }; }}>
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
      }
    ];
  }

  /**
   * Retorna un arreglo de ICommandBarItemProps para el menu secundario
   * @returns {ICommandBarItemProps[]} Arreglo de botones
   * @private
   */
  public _getFarItems = (): ICommandBarItemProps[] => {
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
   * Actualiza el store, con detalle de expedientes
   */
  private _loadData = async () => {

    const body: MoveRecordDTO = {
      State: [RecordState.ParaGestion]
    };

    this._http.FetchPost(`${apiTransferencia}/Api/Record/RecordExpired`, body)
      .then((_response:any) => {
        let data = _response.map((x: ApiRecordItem, i: number) => {
          return {
            count: i + 1,
            key: x.idExpediente,
            name: x.name,
            nroExpediente: x.code,
            serie: x.nombreSerie,
            subserie: x.nombreSubserie,
            initialDate: x.dateIn,
            endDate: x.dateOut
          };
        });

        this._detailListController.dispatch({ type: loadDetailList, payload: data });
      })
      .catch(err => {
        console.log(err);
        this._detailListController.dispatch({ type: createDetailList, payload: { enableShimmer:false  } });        
      });
  }

  /**
   * El componentDidMount() es llamado despues de renderizar el componente.
   */
  public componentDidMount() {
    this._loadData();
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    return <Page />;
  }
}
