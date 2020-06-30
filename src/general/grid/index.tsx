import * as React from "react";
import { connect } from "react-redux";
import { IGridProps, IGridState } from "./IGrid";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class GridClass extends React.Component<IGridProps, IGridState> {
  
    public render():JSX.Element {
      const { grid } = this.props;
        return ( <Page grid = { grid } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      grid: state.grid
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(GridClass);
  