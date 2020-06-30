import * as React from "react";
import { subspace } from "redux-subspace";
import { IMainProps, IMainState } from "./IMain";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faCog, faSearch } from "@fortawesome/free-solid-svg-icons";

import { IStore } from "../../../redux/namespace";
import { ActionNameEnum } from "../../../redux/action";

import store from "../../../redux/store";
import Page from "./page";
import { MainAppEnum, MainAppViewEnum } from "../../../common/mainApp/main/mainAppContent";
import { IButtonProps } from "../../../redux/reducers/general/button/IButton";

export default class MainClass extends React.Component<IMainProps, IMainState> {
 
    private _btnAdmin = subspace( (state: IStore) => state.btnCancelDocumentaryForm, MainAppEnum.btnAdmin )(store);
    private _btnStructure = subspace( (state: IStore) => state.btnCancelDocumentaryForm, MainAppEnum.btnStructure )(store);
    private _btnSearch = subspace( (state: IStore) => state.btnCancelDocumentaryForm, MainAppEnum.btnSearch )(store);

    constructor(props:IMainProps) {
        super(props);

        this.state = {
            actualView: undefined
        };

        this._btnAdmin.dispatch(this.createButtonElement({
                text: <div><FontAwesomeIcon icon={faCog} color={"#BED12E"} /> { MainAppViewEnum.Admin }</div>,
                variant: "outlined",
                className: "btn-main-menu",
                onClick: () => this.setState({...this.state, actualView: MainAppViewEnum.Admin})
            }
        ));
        this._btnStructure.dispatch(this.createButtonElement({
                text: <div><FontAwesomeIcon icon={faFolder} color={"#BED12E"} /> { MainAppViewEnum.Structure }</div>,
                variant: "outlined",
                className: "btn-main-menu",
                onClick: () => this.setState({...this.state, actualView: MainAppViewEnum.Structure})
            }
        ));

        this._btnSearch.dispatch(this.createButtonElement({
                text: <div><FontAwesomeIcon icon={faSearch} color={"#BED12E"} /> { MainAppViewEnum.Search }</div>,
                variant: "outlined",
                className: "btn-main-menu",
                onClick: () => this.setState({...this.state, actualView: MainAppViewEnum.Search })
            }
        ));
    }

    protected createButtonElement(payload:IButtonProps){
        return { type: ActionNameEnum.createElemet, payload };
    }

    public render() {
        return <Page actualView = { this.state.actualView} />;
    }
}