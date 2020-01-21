import * as React from "react";
import { connect } from "react-redux";
import Page from "./page";

import { IIOIPStore } from "../../redux/namespace";
import { ISpinnerGeneralProps } from "./ISpinnerGeneral";

/**
 * @class Clase Spinner UiFabric.
 */
export class SpinnerGeneral extends React.Component<ISpinnerGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    
    const { spinner } = this.props;
    return <Page spinner = { spinner } />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    spinner: state.spinner
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(SpinnerGeneral);
