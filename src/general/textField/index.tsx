import * as React from "react";
import { subspace, Subspace } from "redux-subspace";
import { connect } from "react-redux";

import {
  changeTextField,
  createTextField
} from "../../redux/actions/general/textField/_actionName";
import store from "../../redux/store";
import Page from "./page";
import { ITextFieldGeneralProps } from "./ITextFieldGeneralProps";
import { IIOIPStore } from "../../redux/namespace";

/**
 * @class Clase DetailList UiFabric.
 */
export class TextFieldGeneral extends React.Component<ITextFieldGeneralProps> {
  /** @private */ private _textFieldController: Subspace<any, any, any>;

  /**
   * Crea una instancia de DetailList.
   * @param {ITextFieldGeneralProps} props Recibe parametros inyectados por Redux.
   */
  constructor(props: ITextFieldGeneralProps) {
    super(props);

    this._textFieldController = subspace(
      (state: IIOIPStore) => state.textField,
      props.namespace
    )(store);

    if (!props.textField.onChange) {
      props.textField.onChange = this.onChange;
      this._textFieldController.dispatch({
        type: createTextField,
        payload: { onChange: this.onChange }
      });
    }
  }

  /**
   * metodo prefefino para controlar cambios en el componente.
   * @param {React.FormEvent<HTMLInputElement | HTMLTextAreaElement>} e Recibe instancia del mismo elemento.
   * @param {string} newValue Recibe el nuevo valor del componente.
   */
  private onChange = (
    e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
    newValue?: string
  ) => {
    this._textFieldController.dispatch({
      type: changeTextField,
      payload: newValue
    });
  }

  /**
   * El metodo render() es requerido para generar el HTML.
   */
  public render(): JSX.Element {
    const { textField } = this.props;
    return <Page textField={textField} />;
  }
}

const mapStateToProps = (state: IIOIPStore) => {
  return {
    textField: state.textField
  };
};

const mapDispatchToProps = {};

/**
 * Conecta el componente con el store de Redux
 * @param {function} mapStateToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 * @param {function | object} mapDispatchToProps https://react-redux.js.org/api/connect#mapdispatchtoprops-object-dispatch-ownprops-object
 */
export default connect(mapStateToProps, mapDispatchToProps)(TextFieldGeneral);
