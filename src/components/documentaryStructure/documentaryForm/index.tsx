import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { sp } from "@pnp/sp";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";

import Page from "./page";
import { DocumentaryFormEnum } from "../../../common/documentary/documentaryForm/documentaryFormEnum";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { createButton } from "../../../redux/actions/general/button/_actionName";
import { createControl, changeValue } from "../../../redux/actions/general/control/_actionName";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { createSelect, hideElement } from "../../../redux/actions/general/select/_actionName";
import { createCheck } from "../../../redux/actions/general/check/_actionName";
import { IControlProps } from "../../../redux/reducers/general/control/IControl";
import { IButtonProps } from "../../../redux/reducers/general/button/IButton";
import { ICheckProps } from "../../../redux/reducers/general/check/ICheck";
import { ISelectProps, ISelectItemProps } from "../../../redux/reducers/general/select/ISelect";
export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {

    private _stateController = subspace( (state: IStore) => state.stateMainDocumentary, MainDocumentaryEnum.state )(store);
    private _btnSaveController = subspace( (state: IStore) => state.btnSaveDocumentaryForm, DocumentaryFormEnum.btnSave )(store);
    private _btnCancelController = subspace( (state: IStore) => state.btnCancelDocumentaryForm, DocumentaryFormEnum.btnCancel )(store);
    private _txtIdController = subspace( (state: IStore) => state.txtIdDocumentaryForm, DocumentaryFormEnum.txtId )(store);
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

        const times:ISelectItemProps[] = [
            { text: "", key :0, hidden: true },
            { text: "6 meses", key: 1, value: 6 },
            { text: "12 meses", key: 2, value: 12 },
            { text: "18 meses", key: 3, value: 18 },
            { text: "24 meses", key: 4, value: 24 }
        ];

        this._btnSaveController.dispatch(this.createButtonElement({ text: "Guardar", variant: "outline-dark", className: "btn-guardar mr-2", size: "lg", onClick: async ()=> await this.saveElement(this.props.activeView) }));
        this._btnCancelController.dispatch(this.createButtonElement({ text:"Cancelar", variant: "outline-dark", className: "btn-cancelar mr-2", size: "lg" }));

        this._txtIdController.dispatch(this.createControlElement({ type: "hidden" }));
        this._txtNombreController.dispatch(this.createControlElement({ placeholder: "Nombre", type: "text", className: "mt-3", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._txtNombreController.dispatch({ type: changeValue, payload: e.currentTarget.value }) }));
        this._txtCodigoController.dispatch(this.createControlElement({ placeholder: "Código", type: "text", className: "mt-3", onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => this._txtCodigoController.dispatch({ type: changeValue, payload: e.currentTarget.value }) }));

        times[0].text = "Tiempo de retención archivos de gestión";
        this._lstGestionController.dispatch(this.createSelectElement({ label: "Tablas de retención documental", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => this._lstGestionController.dispatch({ type:changeValue, payload: e.currentTarget.value }) }));

        times[0].text = "Tiempo de retención archivos central";
        this._lstCentralController.dispatch(this.createSelectElement({ className: "mt-3", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>) =>  this._lstCentralController.dispatch({ type:changeValue, payload: e.currentTarget.value}) } ));
        
        times[0].text = "Tiempo de retención archivos históricos";
        this._lstHistoryController.dispatch(this.createSelectElement({ className: "mt-3", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => this._lstHistoryController.dispatch({ type:changeValue, payload: e.currentTarget.value})}));

        this._lstSecurityController.dispatch(this.createSelectElement({ label: "Grupos de seguridad", hidden: true, items: [{ text: "Lista de grupos", value: undefined, hidden: true, key :0 }], onChange: (e: React.ChangeEvent<HTMLSelectElement>) => this._lstHistoryController.dispatch({ type:changeValue, payload: e.currentTarget.value }) }));

        this._chkKeepController.dispatch(this.createCheckElement({ label: "Conservación total", id: "chk01", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkKeepController.dispatch({ type:changeValue, payload: !this._chkKeepController.getState().checked })}));
        this._chkDeleteController.dispatch(this.createCheckElement({ label: "Eliminación", id: "chk04", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDeleteController.dispatch({ type:changeValue, payload: !this._chkDeleteController.getState().checked })}));
        this._chkDigitizeController.dispatch(this.createCheckElement({ label: "Digitalización", id: "chk03", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDigitizeController.dispatch({ type:changeValue, payload: !this._chkDigitizeController.getState().checked })}));
        this._chkSelectController.dispatch(this.createCheckElement({ label:"Selección", id: "chk02", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkSelectController.dispatch({ type:changeValue, payload: !this._chkSelectController.getState().checked })}));
    }

    protected createCheckElement(payload:ICheckProps){
        return { type: createCheck, payload };
    }

    protected createButtonElement(payload:IButtonProps){
        return { type: createButton, payload };
    }

    protected createControlElement(payload:IControlProps){
        return { type: createControl, payload };
    }

    protected createSelectElement(payload:ISelectProps){
        return { type: createSelect, payload };
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
        let body:any = {
            ID: this._txtIdController.getState().value,
            Title: this._txtNombreController.getState().value,
            Codigo: this._txtCodigoController.getState().value,
        };
        switch(type){
            case TypeFolderEnum.Seccion:
                body.SecurityGroup =  this._lstSecurityController.getState().value;
                if(!body.ID) {
                    body.FondoId = this._stateController.getState().parent;
                }
            break;
            case TypeFolderEnum.Subseccion:
                if(!body.ID) {
                    body.SeccionId = this._stateController.getState().parent;
                }
            break;
            case TypeFolderEnum.Serie:
                if(!body.ID) {
                    body.SeccionId = (this._stateController.getState().itemSelected === TypeFolderEnum.Seccion) ? this._stateController.getState().parent : null;
                    body.SubseccionId = (this._stateController.getState().itemSelected === TypeFolderEnum.Subseccion) ? this._stateController.getState().parent : null;
                }
            break;
            case TypeFolderEnum.Subserie:
                body = {
                    ...body,
                    TiempoGestion: this._lstGestionController.getState().value,
                    TiempoCentral: this._lstCentralController.getState().value,
                    TiempoHistorico: this._lstHistoryController.getState().value,
                    Conservacion: this._chkKeepController.getState().checked,
                    Eliminacion: this._chkDeleteController.getState().checked,
                    Seleccion: this._chkSelectController.getState().checked,
                    Digitalizacion: this._chkDigitizeController.getState().checked
                };
                if(!body.ID) {
                    body.SerieId = this._stateController.getState().parent;
                }
            break;
        }

        const save = (body.ID) ? sp.web.lists.getByTitle(type).items.getById(body.ID).update(body) : sp.web.lists.getByTitle(type).items.add(body);
        save.then(data => {
            this._txtCodigoController.dispatch({ type:changeValue, payload: undefined});
            this._txtNombreController.dispatch({ type:changeValue, payload: undefined});
            this._btnCancelController.getState().onClick(undefined);
        })
        .catch(error => {
            console.log(error);
        });
        
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