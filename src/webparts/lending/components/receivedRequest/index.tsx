import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn } from "office-ui-fabric-react";

import Page from "./page";
import IReceivedRequestProps from "./IReceivedRequestProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { subspace } from "redux-subspace";
import store from "../../../../redux/store";
import { createDetailList } from "../../../../redux/actions/general/detailList/_actionName";


class ReceivedRequestClass extends React.Component<IReceivedRequestProps>  {

  /** @private */ private _detailListReceivedController = subspace( (state: IIOIPStore) => state[this.props.namespace], this.props.namespace)(store);

    constructor(props:IReceivedRequestProps) {
       super(props);
       
       this._detailListReceivedController.dispatch({
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
          key: "subsection",
          name: "Subsección",
          fieldName: "subsection",
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
          name: "Usuario Solicitud",
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
  export default connect(mapStateToProps)(ReceivedRequestClass);
  