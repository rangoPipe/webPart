import * as React from "react";
import { connect } from "react-redux";
import Page from "./page";

import { IIOIPStore } from "../../redux/namespace";
import { IDatePickerGeneralProps } from "./IDatePickerGeneralProps";

/**
 * @class Clase DatePicker UiFabric.
 */
class DatePickerGeneral extends React.Component<IDatePickerGeneralProps> {

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { datePicker } = this.props;
    return <Page datePicker={datePicker} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    datePicker: state.datePicker
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerGeneral);
