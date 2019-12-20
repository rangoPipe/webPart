import React from "react";
import * as moment from "moment";
import { connect } from "react-redux";
import { IColumn } from "office-ui-fabric-react";

import Page from "./page";
import IDevolutionProps from "./IDevolutionProps";
import { IIOIPStore } from "../../../../redux/namespace";
import { subspace } from "redux-subspace";
import store from "../../../../redux/store";
import { createDetailList } from "../../../../redux/actions/general/detailList/_actionName";


class DevolutionClass extends React.Component<IDevolutionProps>  {

  /** @private */ private _detailListDevolutionController = subspace( (state: IIOIPStore) => state[this.props.namespace], this.props.namespace)(store);

    constructor(props:IDevolutionProps) {
       super(props);
       
       this._detailListDevolutionController.dispatch({
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
          onRender: (item: any) => {
            return <span>{item.count}</span>;
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
          onRender: (item: any) => {
            return <span>{item.nroExpediente}</span>;
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
          onRender: (item: any) => {
            return <span>{item.name}</span>;
          }
        },
        {
          key: "devolutionDate",
          name: "Fecha Devolución",
          fieldName: "devolutionDate",
          isResizable: true,
          data: "string",
          minWidth: 100,
          onRender: (item: any) => {
            return <span>{moment(item.endDate).format(dateFormat)}</span>;
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
          onRender: (item: any) => {
            return <span>{item.serie}</span>;
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
  export default connect(mapStateToProps)(DevolutionClass);
  