import * as React from "react";
import { connect } from "react-redux";

import Page from "./page";
import { IModalGeneralProps } from "./IModalGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase Modal UiFabric.
 */
export class ModalGeneral extends React.Component<IModalGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { modal } = this.props;
    return <Page modal={modal} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    modal: state.modal
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(ModalGeneral);
