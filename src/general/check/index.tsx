import * as React from "react";
import { connect } from "react-redux";
import { ICheckProps, ICheckState } from "./ICheck";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class CheckClass extends React.Component<ICheckProps, ICheckState> {
  
    public render():JSX.Element {
      const { check } = this.props;
        return ( <Page check = { check } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      check: state.check
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(CheckClass);
  