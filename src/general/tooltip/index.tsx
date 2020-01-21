import * as React from "react";
import { connect } from "react-redux";
import Page from "./page";

import { IIOIPStore } from "../../redux/namespace";
import { ITooltipGeneralProps } from "./ITooltipGeneral";

/**
 * @class Clase Tooltip UiFabric.
 */
export class TooltipGeneral extends React.Component<ITooltipGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { tooltip } = this.props;
    return <Page tooltip={tooltip} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    Tooltip: state.tooltip
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(TooltipGeneral);
