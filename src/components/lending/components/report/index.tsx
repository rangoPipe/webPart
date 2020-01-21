import * as React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";
import { IColumn, Selection, SelectionMode } from "office-ui-fabric-react";

import Page from "./page";
import store from "../../../../redux/store";

import { IIOIPStore } from "../../../../redux/namespace";
import { BaseService } from "../../../../common/classes/baseService";
import { IReportProps, IReportState } from "./IReport";
import { ReportNameSpace } from "../../../../enum/lending/lendingEnum";

import { createDetailList, loadDetailList, selectRowItem  } from "../../../../redux/actions/general/detailList/_actionName";
import { createButton } from "../../../../redux/actions/general/button/_actionName";


import { IButtonProps, ButtonStyle } from "../../../../redux/reducers/general/button/IButtonProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";

import { LendingResultDTO, LendingDTO } from "../../../../interface/lending/lendingResult";
import { IDatePickerProps, languageEs } from "../../../../redux/reducers/general/datePicker/IDatePickerProps";
import { createDatePicker } from "../../../../redux/actions/general/datePicker/_actionName";
import { ICheckboxProps } from "../../../../redux/reducers/general/checkbox/ICheckboxProps";
import { changeLabel } from "../../../../redux/actions/general/checkbox/_actionName";
import { IContextProps } from "../../../../redux/reducers/common/IContextProps";

/**
 * @class Clase ReportClass contenedor principal del componente de reportes para prestamos.
 */
class ReportClass extends React.Component<IReportProps, IReportState> {
  /** @private */ private _contextController:Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextReport, ReportNameSpace.context )(store);
  /** @private */ private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListReport, ReportNameSpace.detailListReport )(store);

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
      resultVisible: false
    };
  
    this._selection = new Selection({
      onSelectionChanged: () => {
        this._detailListController.dispatch({ type: selectRowItem, payload: this._selection.getSelection() });     
      }
    });
    
    this._detailListController.dispatch({ type: createDetailList, payload: {
      columns: this._createColumns(),
      selection: this._selection,
      selectionMode: SelectionMode.single
    }});   

    this._createButtons();
    this._loadDatePicker();
    this._loadCheckbox();
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
        this._loadPendings();
      }
    }});

    this._buttonCancelController.dispatch({ type: createButton, payload: {
      text: "Cancelar",
      onClick: () => {
        this._selection.setAllSelected(false);
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
          return <span>{ moment(item.fecha_devolucion).format(this._dateFormat) }</span>;
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
          return <span>{ moment(item.fecha_entrega).format(this._dateFormat) }</span>;
        }
      }
    ];
  }

  /**
   * Carga el detaillist en base a los filtros obtenidos.
   * @private
   * @method
   * @returns {void}
   */
  private _loadPendings = ():void => {
    this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/Report`)
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
    this._chkSendedController.dispatch({type: changeLabel, payload: "Solicitudes enviadas"});
    this._chkRequestController.dispatch({type: changeLabel, payload: "Solicitudes recibidas"});
    this._chkAcceptedController.dispatch({type: changeLabel, payload: "Préstamos aceptados"});
    this._chkRejectedController.dispatch({type: changeLabel, payload: "Préstamos rechazados"});
    this._chkLendedController.dispatch({type: changeLabel, payload: "Expedientes en préstamo"});
    this._chkPaybackController.dispatch({type: changeLabel, payload: "Devoluciones"});
  }

  /**
   * Renderiza el componente
   * @public
   * @function
   * @returns {JSX.Element }
   */
  public render(): JSX.Element {
    return (
      <Page resultVisible = { this.state.resultVisible } />
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
  