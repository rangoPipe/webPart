import * as React from "react";
import { connect } from "react-redux";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";

import Page from "./page";
export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {
    
    public render(){
        return <Page activeView = { this.props.activeView } onCancel = { this.props.onCancel } />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryFormClass);