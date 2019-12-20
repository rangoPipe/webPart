import * as React from "react";
import { connect } from "react-redux";

import Page from "./page";
import { IChoiceGroupGeneralProps } from "./IChoiceGroupProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase ChoiceGroup UiFabric.
 */
export class ChoiceGroupGeneral extends React.Component<IChoiceGroupGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { choiceGroup } = this.props;
    return <Page choiceGroup={choiceGroup} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    choiceGroup: state.choiceGroup
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(ChoiceGroupGeneral);
