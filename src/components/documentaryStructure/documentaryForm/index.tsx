import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";
import { ActionNameEnum, createButtonElement, createControlElement, createTextFieldElement, createSelectElement, createCheckElement } from "../../../redux/action";
import store from "../../../redux/store";

import Page from "./page";
import ContentTypeService from "../../../service/sharepoint/ContentTypeService";
import ListService from "../../../service/sharepoint/ListService";

import { DocumentaryFormEnum, times } from "../../../common/documentary/documentaryForm/documentaryFormEnum";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

import { ISelectProps, ISelectItemProps } from "../../../redux/reducers/general/select/ISelect";
import { MainAppEnum } from "../../../common/mainApp/main/mainAppContent";

export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {

    private _appContext = subspace( (state: IStore) => state.appContext, MainAppEnum.context )(store);

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
    private _lstColumnController = subspace( (state: IStore) => state.lstColumnDocumentaryForm, DocumentaryFormEnum.lstColumn )(store);
    private _chkDeleteController = subspace( (state: IStore) => state.chkDeleteDocumentaryForm, DocumentaryFormEnum.chkDelete )(store);
    private _chkDigitizeController = subspace( (state: IStore) => state.chkDigitizeDocumentaryForm, DocumentaryFormEnum.chkDigitize )(store);
    private _chkKeepController = subspace( (state: IStore) => state.chkKeepDocumentaryForm, DocumentaryFormEnum.chkKeep )(store);
    private _chkSelectController = subspace( (state: IStore) => state.chkSelectDocumentaryForm, DocumentaryFormEnum.chkSelect )(store);

    constructor(props:IDocumentaryFormProps){
        super(props);

        this._btnSaveController.dispatch(createButtonElement({ text: "Guardar", variant: "contained", className: "btn-guardar mr-2",  onClick: async ()=> await this.saveElement(this.props.activeView) }));
        this._btnCancelController.dispatch(createButtonElement({ text:"Cancelar", variant: "outlined", className: "btn-cancelar mr-2" }));

        this._txtIdController.dispatch(createControlElement({ type: "hidden" }));
        this._txtNombreController.dispatch(createTextFieldElement({ placeholder: "Nombre", label:"Nombre", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._txtNombreController.dispatch({ type: ActionNameEnum.changeValue, payload: e.currentTarget.value }) }));
        this._txtCodigoController.dispatch(createTextFieldElement({ placeholder: "Código", label:"Código", onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => this._txtCodigoController.dispatch({ type: ActionNameEnum.changeValue, payload: e.currentTarget.value }) }));

        this._lstGestionController.dispatch(createSelectElement({ placeholder: "Meses", label: "Tiempo de retención archivos de gestión", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this._lstGestionController.dispatch({ type:ActionNameEnum.changeValue, payload }) }));
        this._lstCentralController.dispatch(createSelectElement({ placeholder: "Meses", label: "Tiempo de retención archivos central", className: "mt-3", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) =>  this._lstCentralController.dispatch({ type:ActionNameEnum.changeValue, payload}) } ));
        this._lstHistoryController.dispatch(createSelectElement({ placeholder: "Meses", label: "Tiempo de retención archivos históricos",  className: "mt-3", hidden: true, items: times, onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this._lstHistoryController.dispatch({ type:ActionNameEnum.changeValue, payload })}));
        this._lstSecurityController.dispatch(createSelectElement({ label: "Grupos de seguridad", hidden: true, items: [], onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this._lstSecurityController.dispatch({ type:ActionNameEnum.changeValue, payload }) }));
        this._lstColumnController.dispatch(createSelectElement({ label: "Campos", hidden: true, multiple: true, disableCloseOnSelect:true, onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this._lstColumnController.dispatch({ type:ActionNameEnum.changeValue, payload }) }));

        this._chkKeepController.dispatch(createCheckElement({ label: "Conservación total", id: "chk01", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkKeepController.dispatch({ type:ActionNameEnum.changeValue, payload: !this._chkKeepController.getState().checked })}));
        this._chkDeleteController.dispatch(createCheckElement({ label: "Eliminación", id: "chk04", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDeleteController.dispatch({ type:ActionNameEnum.changeValue, payload: !this._chkDeleteController.getState().checked })}));
        this._chkDigitizeController.dispatch(createCheckElement({ label: "Digitalización", id: "chk03", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkDigitizeController.dispatch({ type:ActionNameEnum.changeValue, payload: !this._chkDigitizeController.getState().checked })}));
        this._chkSelectController.dispatch(createCheckElement({ label:"Selección", id: "chk02", onChange: (e: React.ChangeEvent<HTMLInputElement>) => this._chkSelectController.dispatch({ type:ActionNameEnum.changeValue, payload: !this._chkSelectController.getState().checked })}));

        this.loadColumns();
        
    }

    private loadColumns = async () => {
        const service = new ContentTypeService();
        const items = await service.getAllColumnsAsync();
        this._lstColumnController.dispatch({ type: ActionNameEnum.loadItems, payload:items });
    }

    private createView(){
        this.hideElemnts(!(this.props.activeView === TypeFolderEnum.Subserie));
        this._lstSecurityController.dispatch({  type: ActionNameEnum.hideElement, payload: !(this.props.activeView === TypeFolderEnum.Seccion) }); 
        this._lstColumnController.dispatch({  type: ActionNameEnum.hideElement, payload: !(this.props.activeView === TypeFolderEnum.TipoDocumental) });
    }

    private hideElemnts(hide:boolean) {
        const action = {  type: ActionNameEnum.hideElement, payload: hide };
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
                    TiempoGestion: (this._lstGestionController.getState().value as ISelectProps).value,
                    TiempoCentral: (this._lstCentralController.getState().value as ISelectProps).value,
                    TiempoHistorico: (this._lstHistoryController.getState().value as ISelectProps).value,
                    Conservacion: this._chkKeepController.getState().checked,
                    Eliminacion: this._chkDeleteController.getState().checked,
                    Seleccion: this._chkSelectController.getState().checked,
                    Digitalizacion: this._chkDigitizeController.getState().checked
                };
                if(!body.ID) {
                    body.SerieId = this._stateController.getState().parent;
                }
            break;
            case TypeFolderEnum.TipoDocumental: 
                this.saveDocumentalType();
            return;
        }

        const service = new ListService();

        service.saveListSPAsync(type, body)
            .then( _ => this.cleanForm())
            .catch(error => console.log(error));
        
    }

    protected saveDocumentalType = async () =>
    {
        const service = new ContentTypeService();        
        const data = JSON.stringify({
            name:this._txtNombreController.getState().value,
            columns: ( this._lstColumnController.getState().value as ISelectItemProps[]).map(x => x.value)
        });
        
        await service.saveDocumentalTypeAsync(this._appContext.getState().properties.urlContentTypeApi, data)
        .then(res => (res.success) ? this.cleanForm() : console.log(res.data) )
        .catch(error => console.log(error) ); 
    }

    private cleanForm = () => {
        this._txtCodigoController.dispatch({ type:ActionNameEnum.changeValue, payload: undefined});
        this._txtNombreController.dispatch({ type:ActionNameEnum.changeValue, payload: undefined});
        this._lstColumnController.dispatch({ type:ActionNameEnum.changeValue, payload: undefined});
        this._btnCancelController.getState().onClick(undefined);
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