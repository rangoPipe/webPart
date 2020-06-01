import * as React from "react";
import { subspace } from "redux-subspace";
import { IMainProps, IMainState } from "./IMain";

import { IStore } from "../../../redux/namespace";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { TypeFolderEnum, IDocumentary, DocumentaryTreeEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

import store from "../../../redux/store";
import Page from "./page";
import { DocumentaryFormEnum } from "../../../common/documentary/documentaryForm/documentaryFormEnum";
import { changeView, onChangeView } from "../../../redux/actions/component/documentaryStructure/mainDocumentary/_actionName";
import { onClick } from "../../../redux/actions/general/button/_actionName";
import { changeValue } from "../../../redux/actions/general/control/_actionName";

export default class MainClass extends React.Component<IMainProps, IMainState> {

    private _stateController = subspace( (state: IStore) => state.stateMainDocumentary, MainDocumentaryEnum.state )(store);

    private _stateTreeFormController = subspace( (state: IStore) => state.stateDocumentaryTree, DocumentaryTreeEnum.state )(store); 
    private _btnCancelFormController = subspace( (state: IStore) => state.btnCancelDocumentaryForm, DocumentaryFormEnum.btnCancel )(store);  
    private _txtNombreController = subspace( (state: IStore) => state.txtNombreDocumentaryForm, DocumentaryFormEnum.txtNombre )(store);
    private _txtCodigoController = subspace( (state: IStore) => state.txtCodigoDocumentaryForm, DocumentaryFormEnum.txtCodigo )(store);
    private _IdFormController = subspace( (state: IStore) => state.txtIdDocumentaryForm, DocumentaryFormEnum.txtId )(store);
    private _lstCentralController = subspace( (state: IStore) => state.lstCentralDocumentaryForm, DocumentaryFormEnum.lstCentral )(store);
    private _lstGestionController = subspace( (state: IStore) => state.lstGestionDocumentaryForm, DocumentaryFormEnum.lstGestion )(store);
    private _lstHistoryController = subspace( (state: IStore) => state.lstHistoryDocumentaryForm, DocumentaryFormEnum.lstHistory )(store);
    private _lstSecurityController = subspace( (state: IStore) => state.lstSecurityDocumentaryForm, DocumentaryFormEnum.lstSecurity )(store);
    private _chkDeleteController = subspace( (state: IStore) => state.chkDeleteDocumentaryForm, DocumentaryFormEnum.chkDelete )(store);
    private _chkDigitizeController = subspace( (state: IStore) => state.chkDigitizeDocumentaryForm, DocumentaryFormEnum.chkDigitize )(store);
    private _chkKeepController = subspace( (state: IStore) => state.chkKeepDocumentaryForm, DocumentaryFormEnum.chkKeep )(store);
    private _chkSelectController = subspace( (state: IStore) => state.chkSelectDocumentaryForm, DocumentaryFormEnum.chkSelect )(store);

    constructor(props:IMainProps) {
        super(props);

        this.state = {
            activeView: undefined
        };

        this._stateController.dispatch({ type: onChangeView, payload: this._changeView });
        this._btnCancelFormController.dispatch({ type: onClick,  payload: () => this._changeView(undefined) });
    }

    private _changeView = (view:TypeFolderEnum, data?:IDocumentary) => {
        let codigo ="", title ="", id;
        if(data){
            codigo = (data.Codigo)? data.Codigo : undefined ;
            title = (data.Title)? data.Title : undefined ;
            id = (data.ID)? data.ID : undefined ;

            if(view == TypeFolderEnum.Subserie) {
                this._chkKeepController.dispatch({ type: changeValue, payload: data.Conservacion });
                this._chkDeleteController.dispatch({ type: changeValue, payload: data.Eliminacion });
                this._chkDigitizeController.dispatch({ type: changeValue, payload: data.Digitalizacion });
                this._chkSelectController.dispatch({ type: changeValue, payload: data.Seleccion });

                this._lstCentralController.dispatch({ type: changeValue, payload: data.TiempoCentral });
                this._lstGestionController.dispatch({ type: changeValue, payload: data.TiempoGestion });
                this._lstHistoryController.dispatch({ type: changeValue, payload: data.TiempoHistorico });
            }
        }
        
        this._txtCodigoController.dispatch({type: changeValue, payload : codigo });
        this._txtNombreController.dispatch({type: changeValue, payload : title });
        this._IdFormController.dispatch({type: changeValue, payload : id });
        this._stateController.dispatch({type:changeView, payload: view });

        this._stateTreeFormController.getState().loadItems();
        this.setState({...this.state, activeView: view });
    }


    public render() {
        return <Page activeView = { this.state.activeView } />;
    }
}