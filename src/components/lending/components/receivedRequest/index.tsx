import * as React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";
import { IColumn, SelectionMode, ICommandBarProps, ICommandBarItemProps, Selection, IconButton, IModalProps, ITextFieldProps, IMessageBarProps, MessageBarType, IChoiceGroupOption, IButtonProps } from "office-ui-fabric-react";
import { IChoiceGroupProps } from "../../../../redux/reducers/general/choiceGroup/IChoiceGroupProps";

import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";
import { EnumEstadoPrestamo } from "../../../../enum/lending/lendingEnum";
import { BaseService } from "../../../../common/classes/baseService";
import Page from "./page";

import { IReceivedRequestProps, IReceivedRequestState } from "./IReceivedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import store from "../../../../redux/store";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";
import { ReceivedNameSpace } from "../../../../enum/lending/lendingEnum";
import { LendingDTO, LendingResultDTO, LendingResult } from "../../../../interface/lending/lendingResult";


import { hideMessageBar } from "../../../../redux/actions/general/messageBar/_actionName";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { createChoiceGroup, selectChoiceGroup } from "../../../../redux/actions/general/choiceGroup/_actionName";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";
import { createButton, changeText } from "../../../../redux/actions/general/button/_actionName";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";
import { ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";

import Content from "./contentModal";
import { IContextProps } from "../../../../redux/reducers/common/IContextProps";

/**
 * @class Clase ReceivedRequestClass contenedor principal del componente de listado de solicitudes.
 */
class ReceivedRequestClass extends React.Component<IReceivedRequestProps, IReceivedRequestState>  {
  /** @private */  private _contextController:Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextReceived, ReceivedNameSpace.context )(store);
  /** @private */  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListReceived, ReceivedNameSpace.detailListReceived )(store);
  /** @private */  private _commandBarController:Subspace<ICommandBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.commandBarReceived, ReceivedNameSpace.commandBarReceived )(store);
  
  /** @private */  private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalReceived, ReceivedNameSpace.modalReceived )(store);
  /** @private */  private _textAreaController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.textAreaReceived, ReceivedNameSpace.textAreaReceived )(store);
  /** @private */  private _messageBarController:Subspace<IMessageBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.messageBarReceived, ReceivedNameSpace.messageBarReceived )(store);
  /** @private */  private _choiceGruopController:Subspace<IChoiceGroupProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.choiceGroupReceived, ReceivedNameSpace.choiceGroupReceived )(store);
  /** @private */  private _btnLeadController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.btnLeadReceived, ReceivedNameSpace.btnLeadReceived )(store);
  /** @private */  private _txtSearchController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.txtFilterDtlReceived, ReceivedNameSpace.txtFilterDtlReceived )(store);

  /** @private */  private _http: BaseService = new BaseService(ReceivedNameSpace.context);
  /** @private */  private _selection: Selection;

  /** @private */  private _aproveLeadbtn:string = "Aprobar";
  /** @private */  private _rejectLeadbtn:string = "Rechazar";  
  
  /**
   * Crea una instancia de ReceivedRequestClass.
   * @param {IReceivedRequestProps} props Recibe parametros inyectados por Redux.
   */
    constructor(props:IReceivedRequestProps) {
       super(props);

       this.state = {
         modalVisible : false
       };

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

      this._choiceGruopController.dispatch({ type: createChoiceGroup, payload: {
        options: this._createChoices(),
        defaultSelectedKey: "acceptChoice",
        optionSelected: EnumEstadoPrestamo.Aprobado
      }});

      this._textAreaController.dispatch({ type: createTextField, payload: {        
        multiline: true,
        label: "Observación respuesta",
        rows: 5,
        onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          this._textAreaController.dispatch({ type:changeTextField, payload: newValue});
        }
      }});

      this._txtSearchController.dispatch({ type: createTextField, payload: {
        placeholder: "Buscar...",
        style: { backgroundColor:"rgba(244, 244, 244, 0.43)" },
        onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
          this._txtSearchController.dispatch({ type:changeTextField, payload: newValue});
        }
      }});

      this._btnLeadController.dispatch({ type: createButton, payload: {
        text:"Prestar",
        onClick: () => {
          
          const item = this._detailListController.getState().selectedItems[0];
          this._sendRequest(item);          
        },
        buttonStyle: ButtonStyle.PrimaryButton
      }});
      
      this._loadData();
      this._createModal();
    }

  /**
   * Retorna las opciones para la respuesta final en el formulario de respuesta.
   * @private
   * @function
   * @returns {IChoiceGroupOption[]}
   */
    private _createChoices = (): IChoiceGroupOption[] => {
      return [{
        key: "acceptChoice",
        iconProps: { iconName: "BoxCheckmarkSolid" },
        text: "Aceptar",
        onClick: () => {
          this._btnLeadController.dispatch({ type: changeText, payload: this._aproveLeadbtn });
          this._choiceGruopController.dispatch({type: selectChoiceGroup, payload:  EnumEstadoPrestamo.Aprobado });
        }
      },{
        key: "rejectChoice",
        iconProps: { iconName: "BoxMultiplySolid" },
        text: "Rechazar",
        onClick: () => {
          this._btnLeadController.dispatch({ type: changeText, payload: this._rejectLeadbtn });          
          this._choiceGruopController.dispatch({type: selectChoiceGroup, payload: EnumEstadoPrestamo.Rechazado });
        }
      }];
    }

  /**
   * Retorna arreglo con las columnas del detaillist.
   * @private
   * @function
   * @returns {IColumn[]}
   */
    private _createColumns = ():IColumn[] => {
      const dateFormat = "YYYY/MM/DD";
      return [{
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

  /**
   * Retorna un arreglo de opciones para el menu.
   * @private
   * @function
   * @returns {ICommandBarItemProps[]}
   */
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
              <Content item = { item } onCancel = { () => this._closeModal() } /> 
            });

          this.setState({
            ...this.state,
            modalVisible : true
          });
        }
      }];
    }

  /**
   * Carga el detaillist..
   * @private
   * @method
   * @returns {void}
   */
    private _loadData = ():void => {
      this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/MyReceived`)
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
    private _createModal() {

      const header:JSX.Element = (
        <div className = { contentStyles.header } >
          <span>Aprobar Préstamo</span>
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
    private _closeModal = (properties = {}) => {
      this.setState({
        ...this.state,
        ...properties,
        modalVisible: false
      });
    }

  /**
   * Oculta el messageBar
   * @private
   * @event
   * @returns {void}
   */
    private _hideMessage =  ( showMessage, message = "", messageBarType = MessageBarType.error) => {
      this._messageBarController.dispatch({ type: hideMessageBar, payload : {
        messageBarType,
        isMultiline: false,
        value: message,
        hideMessage: showMessage
      }});
    }

  /**
   * Metodo con peticion http, para renovacion o entrega del prestamo.
   * @private
   * @method
   * @returns {void}
   */
    private _sendRequest = (item:LendingDTO) => {

      const observacion:string = this._textAreaController.getState().value;           
      this._hideMessage(true);
      const requestLend: LendingDTO = {
          ...item, 
          observacion, 
          idEstado: this._choiceGruopController.getState().optionSelected };
      this._hideMessage(false, "Procesando...", MessageBarType.warning );

      this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/AproveLend`, requestLend)
      .then((_response:LendingResult) => {
        if(_response) {          
          if(_response.success) {
            this._hideMessage(false, "Proceso finalizado exitosamente", MessageBarType.success );
            this._loadData();
            this._closeModal();
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

  /**
   * Renderiza el componente
   * @public
   * @function
   * @returns {JSX.Element }
   */
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
  