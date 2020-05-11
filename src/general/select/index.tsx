import * as React from "react";
import { connect } from "react-redux";
import { ISelectProps, ISelectState } from "./ISelect";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class SelectClass extends React.Component<ISelectProps, ISelectState> {
  
    public render():JSX.Element {
      const { select } = this.props;
        return ( <Page select = { select } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      select: state.select
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(SelectClass);
  