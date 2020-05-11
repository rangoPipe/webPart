import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";

import Page from "./page";
import { DocumentaryFormEnum } from "../../../common/documentary/documentaryForm/documentaryTreeEnum";
import { createButton } from "../../../redux/actions/general/button/_actionName";
import { createControl, changeText } from "../../../redux/actions/general/control/_actionName";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { createSelect, hideElement } from "../../../redux/actions/general/select/_actionName";
import { createCheck } from "../../../redux/actions/general/check/_actionName";
export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {

    //private _fondoController = subspace( (state: IStore) => state.contextDocumentaryForm, DocumentaryFormEnum.contextDocumentaryForm )(store);
    private _btnSaveController = subspace( (state: IStore) => state.btnSeccionDocumentary, DocumentaryFormEnum.btnSave )(store);
    private _btnCancelController = subspace( (state: IStore) => state.btnSubseccionDocumentary, DocumentaryFormEnum.btnCancel )(store);
    private _txtNombreController = subspace( (state: IStore) => state.txtNombreDocumentaryForm, DocumentaryFormEnum.txtNombre )(store);
    private _txtCodigoController = subspace( (state: IStore) => state.txtCodigoDocumentaryForm, DocumentaryFormEnum.txtCodigo )(store);
    private _lstCentralController = subspace( (state: IStore) => state.lstCentralDocumentaryForm, DocumentaryFormEnum.lstCentral )(store);
    private _lstGestionController = subspace( (state: IStore) => state.lstGestionDocumentaryForm, DocumentaryFormEnum.lstGestion )(store);
    private _lstHistoryController = subspace( (state: IStore) => state.lstHistoryDocumentaryForm, DocumentaryFormEnum.lstHistory )(store);
    private _lstSecurityController = subspace( (state: IStore) => state.lstSecurityDocumentaryForm, DocumentaryFormEnum.lstSecurity )(store);
    private _chkDeleteController = subspace( (state: IStore) => state.chkDeleteDocumentaryForm, DocumentaryFormEnum.chkDelete )(store);
    private _chkDigitizeController = subspace( (state: IStore) => state.chkDigitizeDocumentaryForm, DocumentaryFormEnum.chkDigitize )(store);
    private _chkKeepController = subspace( (state: IStore) => state.chkKeepDocumentaryForm, DocumentaryFormEnum.chkKeep )(store);
    private _chkSelectController = subspace( (state: IStore) => state.chkSelectDocumentaryForm, DocumentaryFormEnum.chkSelect )(store);

    constructor(props:IDocumentaryFormProps){
        super(props);

        this._btnSaveController.dispatch({
            type: createButton, payload: {
                text: "Guardar",
                variant: "outline-dark",
                className: "btn-guardar mr-2",
                size: "lg",
                onClick: async ()=> await this.saveElement(this.props.activeView)               
            }
        });

        this._btnCancelController.dispatch({
            type: createButton, payload: {
                text: "Cancelar",
                variant: "outline-dark",
                className: "btn-cancelar mr-2",
                size: "lg",
            }
        });

        this._txtNombreController.dispatch({
            type: createControl, payload: {
                label: "Nombre:",
                placeholder: "Nombre",
                variant: "outline-dark",
                type: "text",
                className: "mt-3",
                onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    this._txtNombreController.dispatch({ type:changeText, payload: e.currentTarget.value });
                }
            }
        });

        this._txtCodigoController.dispatch({
            type: createControl, payload: {
                label: "Código:",
                placeholder: "Código",
                variant: "outline-dark",
                type: "text",
                className: "mt-3",
                onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    this._txtCodigoController.dispatch({ type:changeText, payload: e.currentTarget.value});
                },
            }
        });

        this._lstGestionController.dispatch({
            type: createSelect, payload: {
                label: "Tablas de retención documental",
                hidden: true,
                items: [
                    { text: "Tiempo de retención archivos de gestión", hidden: true, key :0 }
                ]
            }
        });

        this._lstCentralController.dispatch({
            type: createSelect, payload: {
                className: "mt-3",
                hidden: true,
                items: [
                    { text: "Tiempo de retención de archivos central",  hidden: true, key :0 }
                ]
            }
        });

        this._lstHistoryController.dispatch({
            type: createSelect, payload: {
                className: "mt-3",
                hidden: true,
                items: [
                    { text: "Tiempo de retención archivos históricos", hidden: true, key :0 }
                ]
            }
        });

        this._lstSecurityController.dispatch({
            type: createSelect, payload: {
                text: "Grupos de seguridad",
                hidden: true,
                items: [
                    { text: "Lista de grupos", value: undefined, hidden: true, key :0 }
                ]
            }
        });

        this._chkKeepController.dispatch({
            type: createCheck, payload: {
                label: "Conservación total",
                id: "chk01"
            }
        });

        this._chkDeleteController.dispatch({
            type: createCheck, payload: {
                label: "Eliminación",
                id: "chk04"
            }
        });

        this._chkDigitizeController.dispatch({
            type: createCheck, payload: {
                label: "Digitalización",
                id: "chk03",
            }
        });

        this._chkSelectController.dispatch({
            type: createCheck, payload: {
                label: "Selección",
                id: "chk02",
            }
        });
    }

    private createView(){
        this.hideElemnts(!(this.props.activeView === TypeFolderEnum.Subserie));
        this._lstSecurityController.dispatch({  type: hideElement, payload: !(this.props.activeView === TypeFolderEnum.Seccion) });
        
    }

    private hideElemnts(hide:boolean) {
        const action = {  type: hideElement, payload: hide };
        this._lstCentralController.dispatch(action);
        this._lstHistoryController.dispatch(action);
        this._lstGestionController.dispatch(action);
        this._chkDeleteController.dispatch(action);
        this._chkDigitizeController.dispatch(action);
        this._chkSelectController.dispatch(action);
        this._chkKeepController.dispatch(action);
    }

    private saveElement = async (type:TypeFolderEnum) => {
        /*await sp.web.lists.getByTitle(TypeFolderEnum).items.add({
            Title: this._txtNombreController.dispatch({ type:changeText, payload: undefined}),
            Codigo: this._txtCodigoController.dispatch({ type:changeText, payload: undefined})
          });*/

          this._txtCodigoController.dispatch({ type:changeText, payload: undefined});
          this._txtNombreController.dispatch({ type:changeText, payload: undefined});
    }

    public componentDidUpdate(){
        this.createView();
    }

    public componentDidMount(){
        this.createView();
    }

    public render(){
        return <Page activeView = { this.props.activeView } />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryFormClass);