import * as React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";
import { IColumn, Selection, SelectionMode, ICommandBarItemProps, IconButton } from "office-ui-fabric-react";

import Page from "./page";
import Content from "./contentModal";
import store from "../../../../redux/store";
import { contentStyles, iconButtonStyles } from "../../../../common/classes/style";

import { IIOIPStore } from "../../../../redux/namespace";
import { BaseService } from "../../../../common/classes/baseService";
import { IReportProps, IReportState } from "./IReport";
import { ReportNameSpace, EnumEstadoPrestamoReporte } from "../../../../enum/lending/lendingEnum";

import { createDetailList, loadDetailList, selectRowItem  } from "../../../../redux/actions/general/detailList/_actionName";
import { createButton } from "../../../../redux/actions/general/button/_actionName";


import { IButtonProps, ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";

import { LendingResultDTO, LendingDTO, LendingFilter } from "../../../../interface/lending/lendingResult";
import { IDatePickerProps, languageEs } from "../../../../redux/reducers/general/datePicker/IDatePickerProps";
import { createDatePicker, changeValue } from "../../../../redux/actions/general/datePicker/_actionName";
import { ICheckboxProps } from "../../../../redux/reducers/general/checkbox/ICheckboxProps";
import { createCheckbox, changeChecked } from "../../../../redux/actions/general/checkbox/_actionName";
import { IContextProps } from "../../../../redux/reducers/common/IContextProps";
import { createTextField, changeTextField } from "../../../../redux/actions/general/textField/_actionName";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { IModalProps } from "../../../../redux/reducers/general/modal/IModalProps";
import { ITextFieldProps } from "../../../../redux/reducers/general/textField/ITextFieldProps";
import { ICommandBarProps } from "../../../../redux/reducers/general/commandBar/ICommandBarProps";
import { createModal, createContent } from "../../../../redux/actions/general/modal/_actionName";

/**
 * @class Clase ReportClass contenedor principal del componente de reportes para prestamos.
 */
class ReportClass extends React.Component<IReportProps, IReportState> {
  /** @private */ private _contextController:Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextReport, ReportNameSpace.context )(store);
  /** @private */ private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListReport, ReportNameSpace.detailListReport )(store);
  /** @private */ private _commandBarController:Subspace<ICommandBarProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.commandBarReport, ReportNameSpace.commandBarReport )(store);
  /** @private */ private _txtSearchController:Subspace<ITextFieldProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.txtFilterDtlReport, ReportNameSpace.txtFilterDtlReport )(store);
  /** @private */ private _modalController:Subspace<IModalProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.modalReport, ReportNameSpace.modalReport )(store);

  /** @private */ private _buttonSearchController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonSearchReport, ReportNameSpace.buttonSearchReport )(store);
  /** @private */ private _buttonCancelController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonCancelReport, ReportNameSpace.buttonCancelReport )(store);
  
  /** @private */ private _datePickerStartController:Subspace<IDatePickerProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.datePickerStartReport, ReportNameSpace.datePickerStartReport )(store);
  /** @private */ private _datePickerEndController:Subspace<IDatePickerProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.datePickerEndReport, ReportNameSpace.datePickerEndReport )(store);

  /** @private */ private _chkSendedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkSendedReport, ReportNameSpace.chkSendedReport )(store);
  /** @private */ private _chkRequestController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkRequestReport, ReportNameSpace.chkRequestReport )(store);
  /** @private */ private _chkAcceptedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkAcceptedReport, ReportNameSpace.chkAcceptedReport )(store);
  /** @private */ private _chkRejectedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkRejectedReport, ReportNameSpace.chkRejectedReport )(store);
  /** @private */ private _chkLendedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkLendedReport, ReportNameSpace.chkLendedReport )(store);
  /** @private */ private _chkPaybackController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkPaybackReport, ReportNameSpace.chkPaybackReport )(store);

  /** @private */ private _http: BaseService = new BaseService(ReportNameSpace.context);
  /** @private */ private _selection: Selection;
  /** @private */ private _dateFormat:string = "YYYY/MM/DD";

  /**
   * Crea una instancia de ReportClass.
   * @param {IReportProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IReportProps) {
    super(props);

    this.state = {
      resultVisible: false,
      modalVisible: false
    };
  
    this._selection = new Selection({
      onSelectionChanged: () => {
        this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });
        this._commandBarController.dispatch({
          type: createCommandBar,
          payload: {
            items: (this._selection.getSelectedCount() > 0 ) ? this._createMenu() : []
          }
        });
      }
    });

    this._txtSearchController.dispatch({ type: createTextField, payload: {
      placeholder: "Buscar...",
      style: { backgroundColor:"rgba(244, 244, 244, 0.43)" },
      onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
        this._txtSearchController.dispatch({ type:changeTextField, payload: newValue});
      }
    }});
    
    this._detailListController.dispatch({ type: createDetailList, payload: {
      columns: this._createColumns(),
      selection: this._selection,
      selectionMode: SelectionMode.single
    }});   

    this._createButtons();
    this._loadDatePicker();
    this._loadCheckbox();
    this._createModal();
  }

  /**
   * Crea los botones para el formulario de reportes.
   * @private
   * @method
   * @returns {void}
   */
  private _createButtons():void {

    this._buttonSearchController.dispatch({ type: createButton, payload: {
      buttonStyle: ButtonStyle.PrimaryButton,
      text: "Buscar",
      primary: true,
      iconProps: {
        iconName: "Search"
      },
      onClick: () => {
        let filter:LendingFilter = { estado: [] };
        if(this._datePickerStartController.getState().value) {
          filter.fechaInicial = this._datePickerStartController.getState().value;
        }
        if(this._datePickerEndController.getState().value) {
          filter.fechaFinal = this._datePickerEndController.getState().value;
        }

        if(this._chkSendedController.getState().checked) {
          filter.estado.push(this._chkSendedController.getState().value as EnumEstadoPrestamoReporte);
        }
        if(this._chkRequestController.getState().checked) {
          filter.estado.push(this._chkRequestController.getState().value as EnumEstadoPrestamoReporte);
        }
        if(this._chkAcceptedController.getState().checked) {
          filter.estado.push(this._chkAcceptedController.getState().value as EnumEstadoPrestamoReporte);
        }
        if(this._chkRejectedController.getState().checked) {
          filter.estado.push(this._chkRejectedController.getState().value as EnumEstadoPrestamoReporte);
        }
        if(this._chkLendedController.getState().checked) {
          filter.estado.push(this._chkLendedController.getState().value as EnumEstadoPrestamoReporte);
        }
        if(this._chkPaybackController.getState().checked) {
          filter.estado.push(this._chkPaybackController.getState().value as EnumEstadoPrestamoReporte);
        }
        
        this._loadPendings(filter);
      }
    }});

    this._buttonCancelController.dispatch({ type: createButton, payload: {
      text: "Cancelar",
      onClick: () => {
        this._selection.setAllSelected(false);
        this.setState({
          ...this.state,
          resultVisible:false
        });
      }
    }});   

  }

  /**
   * Crea las columnas del detaillist, retornando un arreglo de tipo IColumn.
   * @private
   * @function
   * @returns {IColumn[]}
   */
  private _createColumns = ():IColumn[] => {
    return [
      {
        key: "nroExpediente",
        name: "No. Expediente",
        fieldName: "nroExpediente",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.nroExpediente}</span>;
        }
      },
      {
        key: "usrRequest",
        name: "Usuario solicitud",
        fieldName: "usrRequest",
        isRowHeader: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: "Sorted A to Z",
        sortDescendingAriaLabel: "Sorted Z to A",
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.userRequest }</span>;
        }
      },
      {
        key: "usr",
        name: "Usuario responsable",
        fieldName: "usr",
        isResizable: true,
        data: "string",
        minWidth: 100,
        maxWidth: 150,
        onRender: (item: LendingDTO) => {
          return <span>{item.userName}</span>;
        }
      },
      {
        key: "file",
        name: "Archivo",
        fieldName: "file",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          return <span>{item.tipo}</span>;
        }
      },
      {
        key: "request_date",
        name: "Fecha solicitud",
        fieldName: "request_date",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          return <span>{ moment(item.fecha_solicitud).format(this._dateFormat) }</span>;
        }
      },
      {
        key: "payback_date",
        name: "Fecha devolución",
        fieldName: "payback_date",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          let date:string = moment(item.fecha_devolucion).format(this._dateFormat);
          return <span>{ (date !== "0001/01/01") ? date : null }</span>;
        }
      },
      {
        key: "finish_date",
        name: "Fecha entrega",
        fieldName: "finish_date",
        isResizable: true,
        data: "string",
        minWidth: 100,
        onRender: (item: LendingDTO) => {
          let date:string = moment(item.fecha_entrega).format(this._dateFormat);
          return <span>{ (date !== "0001/01/01") ? date : null }</span>;
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
  private _createMenu = ():ICommandBarItemProps[] => {
    return [{
      key: "aprove",
      name: "Observaciones",
      iconProps: {
        iconName: "Comment"
      },
      onClick: () => {
        this._loadTrazability(this._detailListController.getState().selectedItems[0].idExpediente);
      }
    }];
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
        <span>Observaciones</span>
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
   * Carga el detaillist en base a los filtros obtenidos.
   * @private
   * @method
   * @returns {void}
   */
  private _loadPendings = (filter:LendingFilter):void => {
    this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/Report`, filter)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });

          this.setState({
            ...this.state,
            resultVisible: true
          });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
  }

  /**
   * Crea los datepicker para el formulario de reportes.
   * @private
   * @method
   * @returns {void}
   */
  private _loadDatePicker = ():void => {
    

    this._datePickerStartController.dispatch({
      type: createDatePicker,
      payload: {
        strings: languageEs,
        placeholder: languageEs.placeholder,
        label: "Fecha Inicial",
        onSelectDate: (date: Date) => this._datePickerStartController.dispatch({ type: changeValue, payload: date }),        
        formatDate: (date: Date): string => {
          return moment(date).format(this._dateFormat);
        }
      }
    });

    this._datePickerEndController.dispatch({
      type: createDatePicker,
      payload: {
        strings: languageEs,
        placeholder: languageEs.placeholder,
        onSelectDate: (date: Date) => this._datePickerEndController.dispatch({ type: changeValue, payload: date }), 
        label: "Fecha Final",
        formatDate: (date: Date): string => {
          return moment(date).format(this._dateFormat);
        }
      }
    });
  }

  /**
   * Crea las checkbutton para el formulario de reportes.
   * @private
   * @method
   * @returns {void}
   */
  private _loadCheckbox = ():void => {
    this._chkSendedController.dispatch({type: createCheckbox, payload: { label: "Solicitudes enviadas", value: EnumEstadoPrestamoReporte.Solicitud_enviada, onChange: (e,checked) => this._chkSendedController.dispatch({type: changeChecked, payload: checked }) }});
    this._chkRequestController.dispatch({type: createCheckbox, payload: { label: "Solicitudes recibidas", value: EnumEstadoPrestamoReporte.Solicitud_recibida ,onChange: (e,checked) => this._chkRequestController.dispatch({type: changeChecked, payload: checked }) }}); 
    this._chkAcceptedController.dispatch({type: createCheckbox, payload: { label: "Préstamos aceptados", value: EnumEstadoPrestamoReporte.Aceptado,onChange: (e,checked) => this._chkAcceptedController.dispatch({type: changeChecked, payload: checked }) }});
    this._chkRejectedController.dispatch({type: createCheckbox, payload: { label: "Préstamos rechazados", value: EnumEstadoPrestamoReporte.Rechazado,onChange: (e,checked) => this._chkRejectedController.dispatch({type: changeChecked, payload: checked }) }});
    this._chkLendedController.dispatch({type: createCheckbox, payload: { label: "Expedientes en préstamo", value: EnumEstadoPrestamoReporte.Prestamo,onChange: (e,checked) => this._chkLendedController.dispatch({type: changeChecked, payload: checked }) }});
    this._chkPaybackController.dispatch({type: createCheckbox, payload: { label: "Devoluciones", value: EnumEstadoPrestamoReporte.Devolucion,onChange: (e,checked) => this._chkPaybackController.dispatch({type: changeChecked, payload: checked }) }});
  }

  /**
   * Carga la trazabilidad de un expediente por id
   * @private
   * @method
   * @returns {void}
   */
  private _loadTrazability = (idExpediente) => {
    this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/Trazability`,{ idExpediente })
      .then((_response:LendingResultDTO) => {
        if(_response.success) {            
          this._modalController.dispatch({ 
            type: createContent,
             payload: 
              <Content items = { _response.result } 
                onCancel = { () => this._closeModal() } 
                /> 
            });

          this.setState({
            ...this.state,
            modalVisible: true
          });
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
    return (
      <Page resultVisible = { this.state.resultVisible } modalVisible = { this.state.modalVisible } />
    );
  }
}

const mapStateToProps = (state: IIOIPStore) => {
    return {
    };
  };
  
  /**
   * Conecta el componente con el store de Redux
   * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
   */
  export default connect(mapStateToProps)(ReportClass);
  