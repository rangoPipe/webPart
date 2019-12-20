import * as React from "react";
import { subspace, Subspace } from "redux-subspace";
import { connect } from "react-redux";

import store from "../../redux/store";
import Page from "./page";
import { ICommandBarGeneralProps } from "./ICommandBarGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase CommandBar UiFabric.
 */
export class CommandBarGeneral extends React.Component<ICommandBarGeneralProps> {
  /** @private */ private _commandBarController: Subspace<any, any, any>;

  /**
   * Crea una instancia de CommandBar.
   * @param {ICommandBarGeneralProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: ICommandBarGeneralProps) {
    super(props);
    

    this._commandBarController = subspace(
      (state: IIOIPStore) => state.commandBar,
      props.namespace
    )(store);
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { commandBar } = this.props;
    return <Page commandBar={commandBar} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    commandBar: state.commandBar
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(CommandBarGeneral);
