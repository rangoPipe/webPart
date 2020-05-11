import * as React from "react";
import { connect } from "react-redux";
import { IControlProps, IControlState } from "./IControl";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class ControlClass extends React.Component<IControlProps, IControlState> {
  
    public render():JSX.Element {
      console.log(this.props);
      
      const { control } = this.props;
        return ( <Page control = { control } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      control: state.control
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(ControlClass);
  