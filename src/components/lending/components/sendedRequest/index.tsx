import * as React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, SelectionMode, ICommandBarItemProps, Selection, IconButton, DialogType, Stack, PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import { subspace, Subspace } from "redux-subspace";
import store from "../../../../redux/store";

import Page from "./page";

import { ISendedRequestProps, ISendedRequestState } from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { SendedNameSpace, EnumEstadoPrestamo } from "../../../../enum/lending/lendingEnum";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";
import { LendingDTO, LendingResultDTO, LendingResult } from "../../../../interface/lending/lendingResult";
import { BaseService } from "../../../../common/classes/baseService";
import { ICommandBarProps } from "../../../../redux/reducers/general/commandBar/ICommandBarProps";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { IModalProps } from "../../../../redux/reducers/general/modal/IModalProps";
import { createModal } from "../../../../redux/actions/general/modal/_actionName";
import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";
import { IDialogProps } from "../../../../redux/reducers/general/dialog/IDialogProps";
import { createDialog, hideDialog } from "../../../../redux/actions/general/dialog/_actionName";
import { IContextProps } from "../../../../redux/reducers/common/IContextProps";
import { ITextFieldProps } from "../../../../redux/reducers/general/textField/ITextFieldProps";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";

/**
 * @class Clase SendendRequestClass contenedor principal del componente de listado para prestamos solicitados.
 */
class SendendRequestClass extends React.Component<ISendedRequestProps, ISendedRequestState>  {
  /** @private */ private _contextController:Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextSended, SendedNameSpace.context )(store);
  /** @private */ private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListSended, SendedNameSpace.detailListSended )(store);
  /** @private */ private _commandBarController:Subspace<ICommandBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.commandBarSended, SendedNameSpace.commandBarSended )(store);
  /** @private */ private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalReceived, SendedNameSpace.modalSended )(store);
  /** @private */ private _dialogController:Subspace<IDialogProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dialogSended, SendedNameSpace.dialogSended )(store);
  /** @private */ private _txtSearchController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.txtFilterDtlSended, SendedNameSpace.txtFilterDtlSended )(store);

  /** @private */ private _http: BaseService = new BaseService(SendedNameSpace.context);
  /** @private */ private _selection:Selection;

  /**
   * Crea una instancia de SendendRequestClass.
   * @param {ISendedRequestProps} props Recibe parametros inyectados por Redux.
   */
    constructor(props:ISendedRequestProps) {
       super(props);

       this.state = {
        modalVisible : false
      };

       this._selection = new Selection({
        onSelectionChanged: () => {

          const items:LendingDTO[] = this._selection.getSelection() as LendingDTO[];
          this._detailListController.dispatch({ type: selectRowItem, payload: items  });
          this._commandBarController.dispatch({
            type: createCommandBar,
            payload: {
              items: this._loadMenu(items)
            }
          });
        }
      });
       
       this._detailListController.dispatch({
         type: createDetailList,
         payload: {
          columns: this._createColumns(),
          selectionMode: SelectionMode.single,
          selection: this._selection
         }
       });

       this._txtSearchController.dispatch({ type: createTextField, payload: {
        placeholder: "Buscar...",
        style: { backgroundColor:"rgba(244, 244, 244, 0.43)" },
        onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          this._txtSearchController.dispatch({ type:changeTextField, payload: newValue});
        }
      }});

       this._loadData();
       this._createModal();
    }

  /**
   * Crea las columnas del detaillist, retornando un arreglo de tipo IColumn.
   * @private
   * @function
   * @returns {IColumn[]}
   */
    private _createColumns = (): IColumn[] => {
      const dateFormat = "YYYY/MM/DD";
      return [
        {
          key: "id",
          name: "Id",
          fieldName: "id",
          isRowHeader: true,
          isSorted: true,
          isSortedDescending: false,
          sortAscendingAriaLabel: "Sorted A to Z",
          sortDescendingAriaLabel: "Sorted Z to A",
          data: "string",
          minWidth: 30,
          maxWidth: 30,
          onRender: (item: LendingDTO) => {
            return <span>{item.idExpediente}</span>;
          }
        },
        {
          key: "type",
          name: "Tipo",
          fieldName: "type",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth: 150,
          onRender: (item: LendingDTO) => {
            return <span>{ item.tipo }</span>;
          }
        },
        {
          key: "section",
          name: "Sección",
          fieldName: "section",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: LendingDTO) => {
            return <span>{item.nombre_seccion}</span>;
          }
        },
        {
          key: "user",
          name: "Usuario Responsable",
          fieldName: "user",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: LendingDTO) => {
            return <span>{item.userName}</span>;
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
          onRender: (item: LendingDTO) => {
            return <span>{item.nombre_subserie}</span>;
          }
        },
        {
          key: "requestDate",
          name: "Fecha de Solicitud",
          fieldName: "requestDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: LendingDTO) => {
            return <span>{moment(item.fecha_solicitud).format(dateFormat)}</span>;
          }
        },
        {
          key: "observation",
          name: "Observaciones",
          fieldName: "observation",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: LendingDTO) => {
            return <span>{item.observacion}</span>;
          }
        },
        {
          key: "state",
          name: "Estado",
          fieldName: "state",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: LendingDTO) => {
            return <span>{item.estado}</span>;
          }
        },
        {
          key: "record",
          name: "Expediente",
          fieldName: "record",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: LendingDTO) => {
            return <span>{item.nroExpediente}</span>;
          }
        }
      ];
    }

  /**
   * Retorna items del menu segun sea el caso requerido
   * @private
   * @function
   * @returns {ICommandBarItemProps[]}
   */
    private _loadMenu = (items:LendingDTO[]):ICommandBarItemProps[] => {

      if(items.length === 0) {
        return [];
      }

      if(items[0].idEstado === EnumEstadoPrestamo.Aprobado) {
        return this._menuAproved();
      }
      else {
        return this._menuRequest();
      }
    }

  /**
   * Retorna items del menu con el fin de aprobacion.
   * @private
   * @function
   * @returns {ICommandBarItemProps[]}
   */
    private _menuAproved = ():ICommandBarItemProps[] => {
      return [{
        key: "aprove",
        name: "Aceptar préstamo",
        iconProps: {
          iconName: "CheckMark"
        },
        onClick: () => {          
          this._dialogController.dispatch({type: createDialog, payload : {
            hideDialog: false,
            type: DialogType.largeHeader,
            title: "Aceptar préstamo",
            subText: "Está seguro de aceptar el préstamo ?",
            footer: (<Stack horizontal horizontalAlign={"center"}  ><PrimaryButton onClick= {()=> this._aproveRequest() }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=> this._closeDialog() }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      },{
        key: "reject",
        name: "Cancelar solicitud",
        iconProps: {
          iconName: "Cancel"
        },
        onClick: () => {
          this._dialogController.dispatch({type: createDialog, payload : {
            hideDialog: false,
            type: DialogType.largeHeader,
            title: "Cancelar solicitud",
            subText: "Está seguro de cancelar la solicitud ?",
            footer: (
              <Stack  horizontal horizontalAlign={"center"}><PrimaryButton onClick= {()=> this._cancelRequest() }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=> this._closeDialog() }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }];
    }

  /**
   * Retorna items del menu con el fin de solicitud.
   * @private
   * @function
   * @returns {ICommandBarItemProps[]}
   */
    private _menuRequest = ():ICommandBarItemProps[] => {
      return [{
        key: "reject",
        name: "Cancelar solicitud",
        iconProps: {
          iconName: "Cancel"
        },
        onClick: () => {
          this._dialogController.dispatch({type: createDialog, payload : {
            hideDialog: false,
            type: DialogType.largeHeader,
            title: "Cancelar solicitud",
            subText: "Está seguro de cancelar la solicitud ?",
            footer: (
              <Stack  horizontal horizontalAlign={"center"}><PrimaryButton onClick= {()=> this._cancelRequest() }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=> this._closeDialog() }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }];
    }

  /**
   * Carga listado de solicitudes al detaillist .
   * @private
   * @method
   * @returns {void}
   */
    private _loadData = ():void => {
      this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/MyRequests`)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
    }

  /**
   * Crea modal de la vista con el formulario de prestamo por medio de Redux.
   * @private
   * @method
   * @returns {void}
   */
    private _createModal():void {
      const header:JSX.Element = (
        <div className = { contentStyles.header } >
          <span>Aceptar Préstamo</span>
          <IconButton
            styles = { iconButtonStyles }
            iconProps={{ iconName: 'Cancel' }}
            onClick={ () => this._closeModal() }
          />
        </div>);
  
      this._modalController.dispatch({ type: createModal, payload: {
        header,
        isOpen: true,
        onDismiss : () => this._closeModal()
      }});
    }

  /**
   * Cierra la modal
   * @private
   * @event
   * @returns {void}
   */
    private _closeModal = (properties = {}):void => {
      this.setState({
        ...this.state,
        ...properties,
        modalVisible: false
      });
    }

  /**
   * Oculta el dialogo
   * @private
   * @event
   * @returns {void}
   */
    private _closeDialog = ():void =>{
      this._dialogController.dispatch({type: hideDialog, payload: true });
    }

  /**
   * Metodo para cancelar solicitud de prestamo.
   * @private
   * @method
   * @returns {void}
   */
    private _cancelRequest = ():void => {
      const item:LendingDTO = this._detailListController.getState().selectedItems[0];      
      item.idEstado = EnumEstadoPrestamo.Cancelado;
      item.observacion = "Se cancela la solicitud por el usuario";
      this._sendRequest(item);      
    }

  /**
   * Metodo para aprobar recepcion de prestamo.
   * @private
   * @method
   * @returns {void}
   */
    private _aproveRequest = ():void => {
      const item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item.idEstado = EnumEstadoPrestamo.Prestado;
      item.observacion = "Inicia el tiempo predeterminado de prestamo";
      this._sendRequest(item);      
    }

  /**
   * Metodo con peticion http, para aprobacion o rechazo del prestamo.
   * @private
   * @method
   * @returns {void}
   */
    private _sendRequest = (item:LendingDTO):void => {        
      this._closeDialog();
      this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/AproveLend`, item)
      .then((_response:LendingResult) => {
        if(_response) {          
          if(_response.success) {
            this._loadData();
          }
        }                   
      })
      .catch(err => {
        console.log(err);       
      });
    }

  /**
   * Renderiza el componente
   * @public
   * @function
   * @returns {JSX.Element }
   */
    public render(): JSX.Element {
        return <Page modalVisible = { this.state.modalVisible } />;
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
  export default connect(mapStateToProps)(SendendRequestClass);
  