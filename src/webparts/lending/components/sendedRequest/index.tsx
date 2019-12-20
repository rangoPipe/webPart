import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn } from "office-ui-fabric-react";

import Page from "./page";
import ISendedRequestProps from "./ISendedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { subspace } from "redux-subspace";
import store from "../../../../redux/store";
import { createDetailList } from "../../../../redux/actions/general/detailList/_actionName";


class SendendRequestClass extends React.Component<ISendedRequestProps>  {

  /** @private */ private _detailListSendedController = subspace( (state: IIOIPStore) => state[this.props.namespace], this.props.namespace)(store);

    constructor(props:ISendedRequestProps) {
       super(props);
       
       this._detailListSendedController.dispatch({
         type: createDetailList,
         payload: {
          columns: this._loadColumns()
         }
       })
    }

    public render(): JSX.Element {
        return <Page namespace={this.props.namespace}/>;
    }

    private _loadColumns = ():IColumn[] => {
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
          onRender: (item: any) => {
            return <span>{item.count}</span>;
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
          onRender: (item: any) => {
            return <span>{item.nroExpediente}</span>;
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
          onRender: (item: any) => {
            return <span>{item.name}</span>;
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
          onRender: (item: any) => {
            return <span>{item.serie}</span>;
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
          onRender: (item: any) => {
            return <span>{item.subserie}</span>;
          }
        },
        {
          key: "requestDate",
          name: "Fecha de Solicitud",
          fieldName: "requestDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: any) => {
            return <span>{moment(item.endDate).format(dateFormat)}</span>;
          }
        },
        {
          key: "observation",
          name: "Observaciones",
          fieldName: "observation",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: any) => {
            return <span>{item.endDate}</span>;
          }
        },
        {
          key: "state",
          name: "Estado",
          fieldName: "state",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: any) => {
            return <span>{item.endDate}</span>;
          }
        },
        {
          key: "record",
          name: "Expediente",
          fieldName: "record",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: any) => {
            return <span>{item.endDate}</span>;
          }
        }
      ];
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
  