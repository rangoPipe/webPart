import * as React from "react";
import { connect } from "react-redux";
import Page from "./page";

import { IIOIPStore } from "../../redux/namespace";
import { IOverlayGeneralProps } from "./IOverlayGeneral";

/**
 * @class Clase Overlay UiFabric.
 */
export class OverlayGeneral extends React.Component<IOverlayGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    
    const { overlay } = this.props;
    return <Page overlay={overlay} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    overlay: state.overlay
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(OverlayGeneral);
