import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";
import { IColumn, Selection, SelectionMode } from "office-ui-fabric-react";

import Page from "./page";
import store from "../../../../redux/store";

import { IIOIPStore } from "../../../../redux/namespace";
import { apiTransferencia } from "../../../../common/connectionString";
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

class ReportClass extends React.Component<IReportProps, IReportState> {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListReport, ReportNameSpace.detailListReport )(store);

  private _buttonSearchController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonSearchReport, ReportNameSpace.buttonSearchReport )(store);
  private _buttonCancelController:Subspace<IButtonProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.buttonCancelReport, ReportNameSpace.buttonCancelReport )(store);
  
  private _datePickerStartController:Subspace<IDatePickerProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.datePickerStartReport, ReportNameSpace.datePickerStartReport )(store);
  private _datePickerEndController:Subspace<IDatePickerProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.datePickerEndReport, ReportNameSpace.datePickerEndReport )(store);

  private _chkSendedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkSendedReport, ReportNameSpace.chkSendedReport )(store);
  private _chkRequestController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkRequestReport, ReportNameSpace.chkRequestReport )(store);
  private _chkAcceptedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkAcceptedReport, ReportNameSpace.chkAcceptedReport )(store);
  private _chkRejectedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkRejectedReport, ReportNameSpace.chkRejectedReport )(store);
  private _chkLendedController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkLendedReport, ReportNameSpace.chkLendedReport )(store);
  private _chkPaybackController:Subspace<ICheckboxProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.chkPaybackReport, ReportNameSpace.chkPaybackReport )(store);

  private _http: BaseService = new BaseService();
  private _selection: Selection;
  private _dateFormat:string = "YYYY/MM/DD";

  constructor(props: IReportProps) {
    super(props);

    this.state = {
      resultVisible: false
    }
  
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
  };

  private _loadPendings = ():void => {
    this._http.FetchPost(`${apiTransferencia}/Api/Lending/Report`)
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

  private _loadCheckbox = ():void => {
    this._chkSendedController.dispatch({type: changeLabel, payload: "Solicitudes enviadas"});
    this._chkRequestController.dispatch({type: changeLabel, payload: "Solicitudes recibidas"});
    this._chkAcceptedController.dispatch({type: changeLabel, payload: "Préstamos aceptados"});
    this._chkRejectedController.dispatch({type: changeLabel, payload: "Préstamos rechazados"});
    this._chkLendedController.dispatch({type: changeLabel, payload: "Expedientes en préstamo"});
    this._chkPaybackController.dispatch({type: changeLabel, payload: "Devoluciones"});
  }

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
  