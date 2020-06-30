import * as React from "react";
import { connect } from "react-redux";
import { IViewerProps, IViewerState } from "./IViewer";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class ViewerClass extends React.Component<IViewerProps, IViewerState> {
  
    public render():JSX.Element {
      const { viewer } = this.props;
        return ( <Page viewer = { viewer } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      viewer: state.viewer
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(ViewerClass);
  