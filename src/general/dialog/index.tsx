import * as React from "react";
import { subspace, Subspace } from "redux-subspace";
import { connect } from "react-redux";

import store from "../../redux/store";
import Page from "./page";
import { IIOIPStore } from "../../redux/namespace";
import { IDialogGeneralProps } from "./IDialogGeneralProps";

/**
 * @class Clase Dialog UiFabric.
 */
class DialogGeneral extends React.Component<IDialogGeneralProps> {
  /** @private */ private _dialogController: Subspace<any, any, any>;

  /**
   * Crea una instancia de Dialog.
   * @param {IDialogGeneralProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IDialogGeneralProps) {
    super(props);
    this._dialogController = subspace(
      (state: IIOIPStore) => state.dialog,
      props.namespace
    )(store);
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { dialog } = this.props;
    return <Page dialog={dialog} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    dialog: state.dialog
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(DialogGeneral);
