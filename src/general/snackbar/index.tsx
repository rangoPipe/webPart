import * as React from "react";
import { connect } from "react-redux";
import { ISnackbarProps, ISnackbarState } from "./ISnackbar";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class SnackbarClass extends React.Component<ISnackbarProps, ISnackbarState> {
  
    public render():JSX.Element {
      const { snackbar } = this.props;
        return ( <Page snackbar = { snackbar } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      snackbar: state.snackbar
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(SnackbarClass);
  