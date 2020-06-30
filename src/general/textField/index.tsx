import * as React from "react";
import { connect } from "react-redux";
import { ITextFieldProps, ITextFieldState } from "./ITextField";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class TextFieldClass extends React.Component<ITextFieldProps, ITextFieldState> {
  
    public render():JSX.Element {
      const { textField } = this.props;
        return ( <Page textField = { textField } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      textField: state.textField
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(TextFieldClass);
  