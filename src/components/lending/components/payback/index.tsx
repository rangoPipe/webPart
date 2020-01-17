import * as React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn, Selection, ICommandBarItemProps, SelectionMode, DialogType, Stack, DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import { subspace } from "redux-subspace";

import Page from "./page";
import { IPaybackProps, IPaybackState } from "./IPaybackProps";
import { IIOIPStore } from "../../../../redux/namespace";
import store from "../../../../redux/store";
import { createDetailList, loadDetailList, selectRowItem } from "../../../../redux/actions/general/detailList/_actionName";
import { LendingDTO, LendingResultDTO, LendingResult } from "../../../../interface/lending/lendingResult";
import { PaybackNameSpace, EnumEstadoPrestamo, LendingNameSpace } from "../../../../enum/lending/lendingEnum";

import { BaseService } from "../../../../common/classes/baseService";
import { createCommandBar } from "../../../../redux/actions/general/commandBar/_actionName";
import { createDialog, hideDialog } from "../../../../redux/actions/general/dialog/_actionName";


class PaybackClass extends React.Component<IPaybackProps, IPaybackState>  {
  /** @private */ private _contextController = subspace( (state: IIOIPStore) => state.contextPayback, PaybackNameSpace.context)(store);
  /** @private */ private _detailListController = subspace( (state: IIOIPStore) => state.detailListPayback, PaybackNameSpace.detailListPayback)(store);
  /** @private */ private _commandBarController = subspace( (state: IIOIPStore) => state.commandBarPayback, PaybackNameSpace.commandBarPayback)(store);
  /** @private */ private _dialogController = subspace( (state: IIOIPStore) => state.dialogPayback, PaybackNameSpace.dialogPayback)(store);

  private _http: BaseService = new BaseService(LendingNameSpace.context);
  private _selection: Selection;

    constructor(props:IPaybackProps) {
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

    private _loadData = ():void => {
      this._http.FetchPost(`${this._contextController.getState().connectionString}/Api/Lending/Payback`)
      .then((_response:LendingResultDTO) => {
        if(_response.success) {        
          this._detailListController.dispatch({ type: loadDetailList, payload: _response.result });
        }                           
      })
      .catch(err => {
        console.log(err);        
      });
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
          key: "nroFiled",
          name: "No. Radicado",
          fieldName: "nroFiled",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: LendingDTO) => {
            return <span>{item.nroRadicado}</span>;
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
          onRender: (item: LendingDTO) => {
            return <span>{moment(item.fecha_devolucion).format(dateFormat)}</span>;
          }
        },
        {
          key: "subject",
          name: "Asunto Radicado",
          fieldName: "subject",
          isResizable: true,
          data: "string",
          minWidth: 250,
          maxWidth: 250,
          onRender: (item: LendingDTO) => {
            return <span>{"campo pendiente"}</span>;
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

    private _closeDialog = ():void => {
      this._dialogController.dispatch({type: hideDialog, payload: true });
    }

    private _loadMenu = ():ICommandBarItemProps[] => {
      return [{
        key: "acceptPayback",
        name: "Aceptar Devolución",
        iconProps: {
          iconName: "CheckMark"
        },
        onClick: () => {
          this._dialogController.dispatch({type: createDialog, payload : {
            hideDialog: false,
            type: DialogType.largeHeader,
            title: "Devolución",
            subText: "Está seguro de recibir el préstamo ?",
            footer: (<Stack horizontal horizontalAlign={"center"}  ><PrimaryButton onClick= {()=> this._comeback()  }>Aceptar</PrimaryButton> <DefaultButton onClick= {()=> this._closeDialog() }>Cancelar</DefaultButton>  </Stack>)
          }});
        }
      }];
    }

    private _comeback = ():void => {
      let item:LendingDTO = this._detailListController.getState().selectedItems[0];
      item.idEstado = EnumEstadoPrestamo.Devuelto;
      item.observacion = "El responsable acepta el retorno del prestamo";
      this._sendRequest(item);
    }

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
  export default connect(mapStateToProps)(PaybackClass);
  