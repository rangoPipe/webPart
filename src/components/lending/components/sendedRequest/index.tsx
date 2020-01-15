import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, SelectionMode, ICommandBarItemProps, Selection, IconButton, DialogType, Stack, PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import { subspace, Subspace } from "redux-subspace";
import store from "../../../../redux/store";

import Page from "./page";

import { ISendedRequestProps, ISendedRequestState } from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { apiTransferencia } from "../../../../common/connectionString";
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

class SendendRequestClass extends React.Component<ISendedRequestProps, ISendedRequestState>  {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListSended, SendedNameSpace.detailListSended )(store);
  private _commandBarController:Subspace<ICommandBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.commandBarSended, SendedNameSpace.commandBarSended )(store);
  private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalReceived, SendedNameSpace.modalSended )(store);
  private _dialogController:Subspace<IDialogProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.dialogSended, SendedNameSpace.dialogSended )(store);

  private _http: BaseService = new BaseService();
  private _selection:Selection;

    constructor(props:ISendedRequestProps) {
       super(props);

       this.state = {
        modalVisible : false
      }

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

       this._loadData();
       this._createModal();
    }

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
            footer: (<Stack horizontal horizontalAlign={"center"}  ><PrimaryButton onClick= {()=>{ this._aproveRequest() } }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=>{ this._closeDialog() } }>Cancelar</DefaultButton>  </Stack>)
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
              <Stack  horizontal horizontalAlign={"center"}><PrimaryButton onClick= {()=>{ this._cancelRequest() } }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=>{ this._closeDialog() } }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }]
    }

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
              <Stack  horizontal horizontalAlign={"center"}><PrimaryButton onClick= {()=>{ this._cancelRequest()} }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=>{ this._closeDialog() } }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }]
    }

    private _loadData = ():void => {
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/MyRequests`)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
    }

    private _createModal() {
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

    private _closeModal = (properties = {}) => {
      this.setState({
        ...this.state,
        ...properties,
        modalVisible: false
      });
    }

    private _closeDialog = () =>{
      this._dialogController.dispatch({type: hideDialog, payload: true });
    }

    private _cancelRequest = () => {
      const item:LendingDTO = this._detailListController.getState().selectedItems[0];      
      item.idEstado = EnumEstadoPrestamo.Cancelado;
      item.observacion = "Se cancela la solicitud por el usuario";
      this._sendRequest(item);      
    }

    private _aproveRequest = () => {
      const item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item.idEstado = EnumEstadoPrestamo.Prestado;
      item.observacion = "Inicia el tiempo predeterminado de prestamo";
      this._sendRequest(item);      
    }

    private _sendRequest = (item:LendingDTO):void => {        
      this._closeDialog();
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/AproveLend`, item)
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
  