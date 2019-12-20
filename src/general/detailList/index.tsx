import * as React from "react";
import { connect } from "react-redux";
import { subspace, Subspace } from "redux-subspace";
import { Selection } from "@uifabric/utilities";

import { selectRowItem, createDetailList } from "../../redux/actions/general/detailList/_actionName";
import store from "../../redux/store";
import Page from "./page";
import { IIOIPStore } from "../../redux/namespace";
import { IDetailListGeneralProps } from "./IDetailListGeneralProps";

/**
 * @class Clase DetailList UiFabric.
 */
export class DetailListGeneral extends React.Component<IDetailListGeneralProps> {
  /** @private */ private _selection: Selection;
  /** @private */ private _detailListController: Subspace<any, any, any>;

  /**
   * Crea una instancia de DetailList.
   * @param {IDetailListGeneralProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IDetailListGeneralProps) {
    super(props);

    this._detailListController = subspace(
      (state: IIOIPStore) => state.detailList,
      props.namespace
    )(store);

    if(this._detailListController.getState().selection){
      this._selection = this._detailListController.getState().selection;
    }
    else {
      this._selection =  new Selection({
        onSelectionChanged: () => {          
          this._detailListController.dispatch({
            type: selectRowItem,
            payload: this._selection.getSelection()
          });
        }
      });
    }

    this._detailListController.dispatch({type:createDetailList, 
    payload: {
      selection:this._selection
    }});
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { detailList } = this.props;
    return <Page detailList={detailList} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    detailList: state.detailList
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(DetailListGeneral);
