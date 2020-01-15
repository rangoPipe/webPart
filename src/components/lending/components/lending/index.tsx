import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, Selection, ICommandBarItemProps, SelectionMode, DialogType, Stack, PrimaryButton, DefaultButton, IconButton, MessageBarType } from "office-ui-fabric-react";
import { subspace } from "redux-subspace";

import Page from "./page";
import Content from "./contentModal";

import { BaseService } from "../../../../common/classes/baseService";
import { apiTransferencia } from "../../../../common/connectionString";

import { ILendingProps, ILendingState } from "./ILendingProps";
import { IIOIPStore } from "../../../../redux/namespace";
import store from "../../../../redux/store";

import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { LendingDTO, LendingResultDTO, LendingResult } from "../../../../interface/lending/lendingResult";
import { LendingNameSpace, EnumEstadoPrestamo } from "../../../../enum/lending/lendingEnum";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { createDialog, hideDialog } from "../../../../redux/actions/general/dialog/_actionName";
import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";
import { hideMessageBar } from "../../../../redux/actions/general/messageBar/_actionName";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";


class LendingClass extends React.Component<ILendingProps, ILendingState>  {

  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListLending, LendingNameSpace.detailListLending)(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarLending, LendingNameSpace.commandBarLending)(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogLending, LendingNameSpace.dialogLending)(store);
  /** @private */ private _modalController = subspace( (state: IIOIPStore) => state.modalLending, LendingNameSpace.modalLending)(store);
  /** @private */ private _messageBarController = subspace( (state: IIOIPStore) => state.messageBarLending, LendingNameSpace.messageBarLending)(store);
  /** @private */ private _textAreaController = subspace( (state: IIOIPStore) => state.textAreaLending, LendingNameSpace.textAreaLending)(store);

  private _http: BaseService = new BaseService();
  private _selection: Selection;

    constructor(props:ILendingProps) {
       super(props);

       this.state = {
         modalVisible : false
       }

       this._selection = new Selection({
        onSelectionChanged: () => {
          
          this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });
          this._commandBarController.dispatch({
            type: createCommandBar,
            payload: {
              items: (this._selection.getSelectedCount() > 0 ) ? this._loadMenu() : []
            }
          });
        }
      });
       
       this._detailListController.dispatch({
         type: createDetailList,
         payload: {
          columns: this._loadColumns(),
          selectionMode: SelectionMode.single,
          selection: this._selection
         }
       });

       this._textAreaController.dispatch({ type: createTextField, payload: {        
        multiline: true,
        label: "Observación renovación",
        rows: 5,
        onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          this._textAreaController.dispatch({ type:changeTextField, payload: newValue});
        }
      }});

       this._loadData();
       this._createModal();
    }

    private _loadColumns = ():IColumn[] => {
      const dateFormat = "YYYY/MM/DD";
      return [
        {
          key: "nroRecord",
          name: "No. Expediente",
          fieldName: "nroRecord",
          isRowHeader: true,
          isSorted: true,
          isSortedDescending: false,
          sortAscendingAriaLabel: "Sorted A to Z",
          sortDescendingAriaLabel: "Sorted Z to A",
          data: "string",
          minWidth: 30,
          maxWidth: 30,
          onRender: (item: LendingDTO) => {
            return <span>{item.nroExpediente}</span>;
          }
        },
        {
          key: "title",
          name: "Titulo Expediente",
          fieldName: "title",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth: 700,
          onRender: (item: LendingDTO) => {
            return <span>{item.nombre_expediente}</span>;
          }
        },
        {
          key: "requestDate",
          name: "Fecha Solicitud",
          fieldName: "requestDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth:300,
          onRender: (item: LendingDTO) => {
            return <span>{moment(item.fecha_solicitud).format(dateFormat)}</span>;
          }
        },
        {
          key: "devolutionDate",
          name: "Fecha Devolución",
          fieldName: "devolutionDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          maxWidth:300,
          onRender: (item: LendingDTO) => {
            return <span>{moment(item.fecha_devolucion).format(dateFormat)}</span>;
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
            return <span>{ item.estado }</span>;
          }
        }
      ];
    }

    private _createModal() {

      const header:JSX.Element = (
        <div className = { contentStyles.header } >
          <span>Renovar préstamo</span>
          <IconButton
            styles = { iconButtonStyles }
            iconProps={{ iconName: 'Cancel' }}
            ariaLabel="Close popup modal"
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

    private _loadMenu = ():ICommandBarItemProps[] => {
      return [{
        key: "renew",
        name: "Renovar",
        iconProps: {
          iconName: "RenewalCurrent"
        },
        onClick: () => {
          const item:LendingDTO = this._detailListController.getState().selectedItems[0];
          this._hideMessage(true);

          this._modalController.dispatch({ 
            type: createContent,
             payload: 
              <Content item = { item } onCancel = { () => this._closeModal() } onAccept = {() =>{ this._renew()  }} /> 
            });

          this.setState({
            ...this.state,
            modalVisible : true
          });
        }
      },{
        key: "payBack",
        name: "Devolver",
        iconProps: {
          iconName: "ReturnToSession"
        },
        onClick: () => {
          this._dialogController.dispatch({type: createDialog, payload : {
            hideDialog: false,
            type: DialogType.largeHeader,
            title: "Devolución",
            subText: "Está seguro de devolver el préstamo ?",
            footer: (<Stack horizontal horizontalAlign={"center"}  ><PrimaryButton onClick= {()=>{ this._payback() } }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=>{ this._closeDialog() } }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }]
    }

    private _loadData = ():void => {
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/MyLendings`)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
    }

    private _closeDialog = ():void => {
      this._dialogController.dispatch({type: hideDialog, payload: true });
    }

    private _hideMessage =  ( showMessage, message = "", messageBarType = MessageBarType.error) => {
      this._messageBarController.dispatch({ type: hideMessageBar, payload : {
        messageBarType,
        isMultiline: false,
        value: message,
        hideMessage: showMessage
      }});
    }

    private _payback = ():void => {
      let item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item = {...item, idEstado : EnumEstadoPrestamo.Devolver, observacion: "El usuario solicita el retorno del prestamo" };
      this._sendRequest(item);
    }

    private _renew = ():void => {
      let observacion:string = this._textAreaController.getState().value;
      if(!observacion || observacion.length === 0) {
        this._hideMessage(false, "El campo observación no puede estar vacio");
        return;
      }

      let item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item = {...item, idEstado : EnumEstadoPrestamo.Renovado, observacion };
      this._sendRequest(item);
    }

    private _sendRequest = (item:LendingDTO):void => {        
      this._closeDialog();
      this._hideMessage(true);
      this._hideMessage(false, "Solicitando...", MessageBarType.warning );
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/AproveLend`, item)
      .then((_response:LendingResult) => {
        if(_response) {          
          if(_response.success) {
            this._loadData();
            this._hideMessage(false, "Solicitud registrada exitosamente", MessageBarType.success );
          }
          else {            
            this._hideMessage(false, _response.message );
          }
        }                   
      })
      .catch(err => {
        console.log(err);  
        this._hideMessage(false, err, MessageBarType.severeWarning );      
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
  export default connect(mapStateToProps)(LendingClass);
  