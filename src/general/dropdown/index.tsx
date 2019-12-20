import * as React from "react";
import { connect } from "react-redux";

import Page from "./page";
import { IDropdownGeneralProps } from "./IDropdownGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase Button UiFabric.
 */
export class DropdownGeneral extends React.Component<IDropdownGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { dropdown } = this.props;
    return <Page dropdown={dropdown} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    dropdown: state.dropdown
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(DropdownGeneral);
