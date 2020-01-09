import * as React from "react";
import { connect } from "react-redux";
import Page from "./page";

import { IIOIPStore } from "../../redux/namespace";
import { ICheckboxGeneralProps } from "./ICheckboxGeneralProps";

/**
 * @class Clase Checkbox UiFabric.
 */
export class CheckboxGeneral extends React.Component<ICheckboxGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { checkbox } = this.props;
    return <Page checkbox={checkbox} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    checkbox: state.checkbox
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(CheckboxGeneral);
