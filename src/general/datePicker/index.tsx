import * as React from "react";
import { connect } from "react-redux";
import { IDatePickerProps, IDatePickerState } from "./IDatePicker";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class DatePickerClass extends React.Component<IDatePickerProps, IDatePickerState> {
  
    public render():JSX.Element {
      const { datePicker } = this.props;
        return ( <Page datePicker = { datePicker } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      datePicker: state.datePicker
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(DatePickerClass);
  