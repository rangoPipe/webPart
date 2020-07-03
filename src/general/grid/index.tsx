import * as React from "react";
import { connect } from "react-redux";
import { IGridProps, IGridState } from "./IGrid";
import { IStore } from "../../redux/namespace";
import Page from "./page";

export class GridClass extends React.Component<IGridProps, IGridState> {
    
    private pagination = (page:number) => {
      this.hidePages();
      this.showpage(page);
    }

    private hidePages = () =>  document.querySelectorAll(`[id^=${this.props.grid.idPage}]`).forEach( (x:HTMLDivElement) => x.style.display = "none");
    private showpage = (idPage:string|number) => document.querySelectorAll(`#${this.props.grid.idPage}${idPage}`).forEach( (x:HTMLDivElement) => x.style.display = "flex");
    
    public render():JSX.Element {            
      const { grid } = this.props;
        return ( <Page grid = { grid } onChange={this.pagination} />);
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
      grid: state.grid
    };
  };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(GridClass);
  