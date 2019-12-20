import * as React from "react";
import { connect } from "react-redux";

import Page from "./page";
import { IButtonGeneralProps } from "./IButtonGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase Button UiFabric.
 */
export class ButtonGeneral extends React.Component<IButtonGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { button } = this.props;
    return <Page button={button} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    button: state.button
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(ButtonGeneral);
