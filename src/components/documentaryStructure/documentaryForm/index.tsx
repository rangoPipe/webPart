import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { sp } from "@pnp/sp-commonjs";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";

import Page from "./page";
import { DocumentaryFormEnum } from "../../../common/documentary/documentaryForm/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { createButton } from "../../../redux/actions/general/button/_actionName";
import { createControl, changeValue } from "../../../redux/actions/general/control/_actionName";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { createSelect, hideElement } from "../../../redux/actions/general/select/_actionName";
import { createCheck } from "../../../redux/actions/general/check/_actionName";
export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {

    private _stateController = subspace( (state: IStore) => state.stateMainDocumentary, MainDocumentaryEnum.state )(store);
    //private _fondoController = subspace( (state: IStore) => state.contextDocumentaryForm, DocumentaryFormEnum.contextDocumentaryForm )(store);
    private _btnSaveController = subspace( (state: IStore) => state.btnSaveDocumentaryForm, DocumentaryFormEnum.btnSave )(store);
    private _btnCancelController = subspace( (state: IStore) => state.btnCancelDocumentaryForm, DocumentaryFormEnum.btnCancel )(store);
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

        const times = [
            { text: "", key :0, hidden: true },
            { text: "6 meses", key: 1, value: 6 },
            { text: "12 meses", key: 2, value: 12 },
            { text: "18 meses", key: 3, value: 18 },
            { text: "24 meses", key: 4, value: 24 }
        ];

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
                placeholder: "Nombre",
                variant: "outline-dark",
                type: "text",
                className: "mt-3",
                onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    this._txtNombreController.dispatch({ type:changeValue, payload: e.currentTarget.value });
                }
            }
        });

        this._txtCodigoController.dispatch({
            type: createControl, payload: {
                placeholder: "Código",
                variant: "outline-dark",
                type: "text",
                className: "mt-3",
                onChange: (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                    this._txtCodigoController.dispatch({ type:changeValue, payload: e.currentTarget.value});
                },
            }
        });

        times[0].text = "Tiempo de retención archivos de gestión";
        this._lstGestionController.dispatch({
            type: createSelect, payload: {
                label: "Tablas de retención documental",
                hidden: true,
                items: times,
                onChange: (e: React.MouseEvent<HTMLSelectElement>)  => {
                    this._lstGestionController.dispatch({ type:changeValue, payload: e.currentTarget.value});
                },
            }
        });

        times[0].text = "Tiempo de retención archivos central";
        this._lstCentralController.dispatch({
            type: createSelect, payload: {
                className: "mt-3",
                hidden: true,
                items: times,
                onChange: (e: React.MouseEvent<HTMLSelectElement>) => {
                    this._lstCentralController.dispatch({ type:changeValue, payload: e.currentTarget.value});
                },
            }
        });
        
        times[0].text = "Tiempo de retención archivos históricos";
        this._lstHistoryController.dispatch({
            type: createSelect, payload: {
                className: "mt-3",
                hidden: true,
                items: times,
                onChange: (e: React.MouseEvent<HTMLSelectElement>)  => {
                    this._lstHistoryController.dispatch({ type:changeValue, payload: e.currentTarget.value});
                },
            }
        });

        this._lstSecurityController.dispatch({
            type: createSelect, payload: {
                text: "Grupos de seguridad",
                hidden: true,
                items: [
                    { text: "Lista de grupos", value: undefined, hidden: true, key :0 }
                ],
                onChange: (e: React.MouseEvent<HTMLSelectElement>)  => {
                    this._lstHistoryController.dispatch({ type:changeValue, payload: e.currentTarget.value});
                },
            }
        });

        this._chkKeepController.dispatch({
            type: createCheck, payload: {
                label: "Conservación total",
                id: "chk01",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkKeepController.dispatch({ type:changeValue }),
            }
        });

        this._chkDeleteController.dispatch({
            type: createCheck, payload: {
                label: "Eliminación",
                id: "chk04",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDeleteController.dispatch({ type:changeValue }),
            }
        });

        this._chkDigitizeController.dispatch({
            type: createCheck, payload: {
                label: "Digitalización",
                id: "chk03",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDigitizeController.dispatch({ type:changeValue }),
            }
        });

        this._chkSelectController.dispatch({
            type: createCheck, payload: {
                label: "Selección",
                id: "chk02",
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkSelectController.dispatch({ type:changeValue }),
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
        let body:any = {
            Title: this._txtNombreController.getState().value,
            Codigo: this._txtCodigoController.getState().value,
        }

        switch(type){
            case TypeFolderEnum.Seccion:
                body = {
                    ...body,
                    FondoId: 4,
                    SecurityGroup: this._lstSecurityController.getState().value,
                }
            break;
            case TypeFolderEnum.Subseccion:
                body = {
                    ...body,
                    SeccionId: 1
                }
            break;
            case TypeFolderEnum.Serie:
                body = {
                    ...body,
                    SeccionId: 1,
                    SubseccionId: 1
                }
            break;
            case TypeFolderEnum.Subserie:
                body = {
                    ...body,
                    SerieId: 1,
                    TiempoGestion: this._lstGestionController.getState().value,
                    TiempoCentral: this._lstCentralController.getState().value,
                    TiempoHistorico: this._lstHistoryController.getState().value,
                    Conservacion: this._chkKeepController.getState().checked,
                    Eliminacion: this._chkDeleteController.getState().checked,
                    Seleccion: this._chkSelectController.getState().checked,
                    Digitalizacion: this._chkDigitizeController.getState().checked
                }
            break;
        }
        
        /*sp.web.lists.getByTitle(type).items.add(body)
        .then(data => {
            console.log(data);
            this._txtCodigoController.dispatch({ type:changeValue, payload: undefined});
            this._txtNombreController.dispatch({ type:changeValue, payload: undefined});
            this._btnCancelController.getState().onClick(undefined);
        })
        .catch(error => {

        });*/  

        console.log(this._stateController.getState());
        
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