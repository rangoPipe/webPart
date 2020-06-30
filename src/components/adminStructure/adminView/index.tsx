import * as React from "react";
import { IAdminViewProps, IAdminViewState } from "./IAdminView";
import Page from "./page";
export default class MainClass extends React.Component<IAdminViewProps, IAdminViewState> {

    
    constructor(props:IAdminViewProps) {
        super(props);

        this.state = {
        };

    }

    public render() {
        return <Page />;
    }
}