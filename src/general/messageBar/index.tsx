import * as React from "react";
import { subspace, Subspace } from "redux-subspace";
import { connect } from "react-redux";

import store from "../../redux/store";
import Page from "./page";
import { IMessageBarGeneralProps } from "./IMessageBarGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase MessageBar UiFabric.
 */
class MessageBarGeneral extends React.Component<IMessageBarGeneralProps> {
  /** @private */ private _messageBarController: Subspace<any, any, any>;

  /**
   * Crea una instancia de MessageBar.
   * @param {IMessageBarGeneralProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: IMessageBarGeneralProps) {
    super(props);

    this._messageBarController = subspace(
      (state: IIOIPStore) => state.messageBar,
      props.namespace
    )(store);
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { messageBar } = this.props;
    return <Page messageBar={messageBar} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    messageBar: state.messageBar
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(MessageBarGeneral);
