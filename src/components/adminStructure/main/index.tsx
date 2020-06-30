import * as React from "react";
import { IMainProps, IMainState } from "./IMain";

import Page from "./page";

export default class MainClass extends React.Component<IMainProps, IMainState> {

    constructor(props:IMainProps) {
        super(props);

        this.state = {
        };

    }

    public render() {
        return <Page />;
    }
}