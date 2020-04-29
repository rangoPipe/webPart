import * as React from "react";
import { connect } from "react-redux";
import { ICardProps, ICardState } from "./ICard";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class CardClass extends React.Component<ICardProps, ICardState> {
  
    render():JSX.Element {
      const { card } = this.props;
        return ( <Page card = { card } />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      card: state.card
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(CardClass);
  