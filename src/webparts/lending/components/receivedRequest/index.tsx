import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, SelectionMode, ICommandBarProps, ICommandBarItemProps, Selection, IconButton, IModalProps, ITextFieldProps, IMessageBarProps, MessageBarType } from "office-ui-fabric-react";
import { subspace, Subspace } from "redux-subspace";
import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";

import Page from "./page";
import { IReceivedRequestProps, IReceivedRequestState } from "./IReceivedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import store from "../../../../redux/store";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";
import { ReceivedNameSpace } from "../../../../enum/lending/lendingEnum";
import { LendingDTO, LendingResultDTO } from "../../../../interface/lending/lendingResult";
import { BaseService } from "../../../../common/classes/baseService";
import { apiTransferencia } from "../../../../common/connectionString";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";

import Content from "./contentModal";
import { createMessageBar, hideMessageBar } from "../../../../redux/actions/general/messageBar/_actionName";


class ReceivedRequestClass extends React.Component<IReceivedRequestProps, IReceivedRequestState>  {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListReceived, ReceivedNameSpace.detailListReceived )(store);
  private _commandBarController:Subspace<ICommandBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.commandBarReceived, ReceivedNameSpace.commandBarReceived )(store);
  
  private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalReceived, ReceivedNameSpace.modalReceived )(store);
  private _textAreaController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.textAreaReceived, ReceivedNameSpace.textAreaReceived )(store);
  private _messageBarController:Subspace<IMessageBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.messageBarReceived, ReceivedNameSpace.messageBarReceived )(store);

  private _http: BaseService = new BaseService();
  private _selection: Selection;
  
    constructor(props:IReceivedRequestProps) {
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
         columns: this._createColumns(),
         selectionMode: SelectionMode.single,
         selection: this._selection
        }
      });

      this._messageBarController.dispatch({ type: createMessageBar, payload: {}});

      
      this._loadData();
      this._createModal();
    }

    private _createColumns = ():IColumn[] => {
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
            return <span>{item.tipo}</span>;
          }
        },
        {
          key: "subsection",
          name: "Subsección",
          fieldName: "subsection",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: LendingDTO) => {
            return <span>{item.nombre_subseccion}</span>;
          }
        },
        {
          key: "user",
          name: "Usuario Solicitud",
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
        }
      ];
    }

    private _loadMenu = ():ICommandBarItemProps[] => {
      return [{
        key: "aprove",
        name: "Responder",
        iconProps: {
          iconName: "TransferCall"
        },
        onClick: () => {

          const item:LendingDTO = this._detailListController.getState().selectedItems[0];
          this._hideMessage(true);

          this._modalController.dispatch({ 
            type :createContent,
             payload: 
              <Content item = { item } 
                onCancel = { () => this._closeModal() } 
                onAccept = { () => console.log("aceptando") }
                /> 
            });

          this.setState({
            ...this.state,
            modalVisible : true
          });
        }
      }]
    }

    private _loadData = ():void => {
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/MyReceived`)
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
          <span>Solicitar Prestamo</span>
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

    private _hideMessage =  ( showMessage, message = "", messageBarType = MessageBarType.error) => {
      this._messageBarController.dispatch({ type: hideMessageBar, payload : {
        messageBarType,
        isMultiline: false,
        value: message,
        hideMessage: showMessage
      }});
    }

    public render(): JSX.Element {
      return <Page modalVisible = { this.state.modalVisible }/>;
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
  export default connect(mapStateToProps)(ReceivedRequestClass);
  