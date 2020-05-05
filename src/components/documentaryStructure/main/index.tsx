import * as React from "react";
import { subspace } from "redux-subspace";
import { IMainProps, IMainState } from "./IMain";

import { IStore } from "../../../redux/namespace";
import { viewDocumentary, MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { DocumentaryTreeEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

import { onClick as onClicEvent } from "../../../redux/actions/general/button/_actionName";
import { changeView } from "../../../redux/actions/component/mainDocumentary/_actionName";

import store from "../../../redux/store";
import Page from "./page";

export default class MainClass extends React.Component<IMainProps, IMainState> {

    private _stateController = subspace( (state: IStore) => state.stateMainDocumentary, MainDocumentaryEnum.state )(store);
    private _fondoController = subspace( (state: IStore) => state.btnFondoDocumentary, DocumentaryTreeEnum.btnFondo )(store);
    private _seccionController = subspace( (state: IStore) => state.btnSeccionDocumentary, DocumentaryTreeEnum.btnSeccion )(store);
    private _subseccionController = subspace( (state: IStore) => state.btnSubseccionDocumentary, DocumentaryTreeEnum.btnSubseccion )(store);
    private _serieController = subspace( (state: IStore) => state.btnSerieDocumentary, DocumentaryTreeEnum.btnSerie )(store);
    private _subserieController = subspace( (state: IStore) => state.btnSubserieDocumentary, DocumentaryTreeEnum.btnSubserie )(store);
    private _tipodocumentalController = subspace( (state: IStore) => state.btnTipoDocumentary, DocumentaryTreeEnum.btnTipo )(store);

    constructor(props:IMainProps) {
        super(props);

        this.state = {
            activeView: undefined
        };

        this._fondoController.dispatch({
            type: onClicEvent, payload: () => this._changeView("fondo")
        });

        this._seccionController.dispatch({
            type: onClicEvent, payload: () => this._changeView("seccion")
        });

        this._subseccionController.dispatch({
            type: onClicEvent, payload: () => this._changeView("subseccion")
        });

        this._serieController.dispatch({
            type: onClicEvent, payload: () => this._changeView("serie")
        });

        this._subserieController.dispatch({
            type: onClicEvent, payload: () => this._changeView("subserie")
        });

        this._tipodocumentalController.dispatch({
            type: onClicEvent, payload: () => this._changeView("tipodocumental")
        });
    }

    private _changeView = (view:viewDocumentary) => {
        this._stateController.dispatch({
            type: changeView, payload: (this._stateController.getState().activeView === view) ? undefined : view
        });
        this.forceUpdate();
    }

    private _onCancel = () => {
        this._stateController.dispatch({
            type: changeView, payload: undefined
        });
        this.forceUpdate();
    }


    public render() {
        return <Page activeView = { this._stateController.getState().activeView } onCancel={ this._onCancel } />;
    }
}