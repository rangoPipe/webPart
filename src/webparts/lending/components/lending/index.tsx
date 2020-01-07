import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, Selection, ICommandBarItemProps, SelectionMode, DialogType, Stack, PrimaryButton, DefaultButton } from "office-ui-fabric-react";
import { subspace } from "redux-subspace";

import Page from "./page";

import { BaseService } from "../../../../common/classes/baseService";
import { apiTransferencia } from "../../../../common/connectionString";

import { ILendingProps, ILendingState } from "./ILendingProps";
import { IIOIPStore } from "../../../../redux/namespace";
import store from "../../../../redux/store";

import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { LendingDTO, LendingResultDTO, LendingResultFilter } from "../../../../interface/lending/lendingResult";
import { LendingNameSpace, EnumEstadoPrestamo } from "../../../../enum/lending/lendingEnum";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { createDialog, hideDialog } from "../../../../redux/actions/general/dialog/_actionName";


class LendingClass extends React.Component<ILendingProps, ILendingState>  {

  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListLending, LendingNameSpace.detailListLending)(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarLending, LendingNameSpace.commandBarLending)(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogLending, LendingNameSpace.dialogLending)(store);

  private _http: BaseService = new BaseService();
  private _selection: Selection;

    constructor(props:ILendingProps) {
       super(props);

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

       this._loadData();
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
          maxWidth: 150,
          onRender: (item: LendingDTO) => {
            return <span>{item.nombre_expediente}</span>;
          }
        },
        {
          key: "devolutionDate",
          name: "Fecha Devolución",
          fieldName: "devolutionDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: LendingDTO) => {
            return <span>{moment(item.fecha_solicitud).format(dateFormat)}</span>;
          }
        }
      ];
    }

    private _loadMenu = ():ICommandBarItemProps[] => {
      return [{
        key: "renew",
        name: "Renovar",
        iconProps: {
          iconName: "RenewalCurrent"
        },
        onClick: () => {
          
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

    private _payback = ():void => {
      let item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item.idEstado = EnumEstadoPrestamo.Devolver
      item.observacion = "El usuario solicita el retorno del prestamo";
      this._sendRequest(item);
    }

    private _sendRequest = (item:LendingDTO):void => {        
      this._closeDialog();
      this._http.FetchPost(`${apiTransferencia}/Api/Lending/AproveLend`, item)
      .then((_response:LendingResultFilter) => {
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
  export default connect(mapStateToProps)(LendingClass);
  