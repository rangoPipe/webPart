import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn } from "office-ui-fabric-react";

import Page from "./page";
import ISendedRequestProps from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { subspace, Subspace } from "redux-subspace";
import store from "../../../../redux/store";
import { apiTransferencia } from "../../../../common/connectionString";
import { createDetailList, loadDetailList } from "../../../../redux/actions/general/detailList/_actionName";
import { SendedNameSpace } from "../../../../enum/lending/lendingEnum";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";
import { LendingDTO, LendingResultDTO } from "../../../../interface/lending/lendingResult";
import { BaseService } from "../../../../common/classes/baseService";


class SendendRequestClass extends React.Component<ISendedRequestProps>  {

  private _detailListController:Subspace<IDetailListProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.detailListSended, SendedNameSpace.detailListSended )(store);
  private _http: BaseService = new BaseService();

    constructor(props:ISendedRequestProps) {
       super(props);
       
       this._detailListController.dispatch({
         type: createDetailList,
         payload: {
          columns: this._createColumns()
         }
       });

       this._loadData();
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

    public render(): JSX.Element {
        return <Page namespace={this.props.namespace}/>;
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
  