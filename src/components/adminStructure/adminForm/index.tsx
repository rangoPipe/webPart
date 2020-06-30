import * as React from "react";
import { IAdminFormProps, IAdminFormState } from "./IAdminForm";
import { AdminFormEnum } from '../../../common/admin/adminForm/adminFormContent';
import ContentTypeService from "../../../service/sharepoint/ContentTypeService";
import DocumentLibraryService from "../../../service/sharepoint/DocumentLibraryService";
import store from "../../../redux/store";
import { TextFieldClass as TextField } from "../../../general/textField";
import { DatePickerClass as DatePicker } from "../../../general/datePicker";
import Page from "./page";

import { subspace } from "redux-subspace";
import { IStore } from "../../../redux/namespace";
import { ActionNameEnum, createTextFieldElement, createSelectElement, createButtonElement } from "../../../redux/action";
import { ISelectItemProps } from "../../../redux/reducers/general/select/ISelect";
import { AdminListEnum } from "../../../common/admin/adminList/adminListContent";

import * as jsPDF from 'jspdf';
import { MainAppEnum } from "../../../common/mainApp/main/mainAppContent";

export default class MainClass extends React.Component<IAdminFormProps, IAdminFormState> {

    private _appContext = subspace( (state: IStore) => state.appContext, MainAppEnum.context )(store);

    private _txtSearchController = subspace( (state: IStore) => state.txtSearchAdminForm, AdminFormEnum.txtSearch )(store);
    private _lstTypeController = subspace( (state: IStore) => state.lstTypeAdminForm, AdminFormEnum.lstType )(store);
    private _lstDocumentalTypeController = subspace( (state: IStore) => state.lstDocumentalTypeAdminForm, AdminFormEnum.lstDocumentalType )(store);
    private _btnSaveController = subspace( (state: IStore) => state.btnSaveAdminForm, AdminFormEnum.btnSave )(store);
    private _btnCancelontroller = subspace( (state: IStore) => state.btnCancelAdminForm, AdminFormEnum.btnCancel )(store);

    private _grid = subspace( (state: IStore) => state.gridListAdmin, AdminListEnum.grid )(store);
    
    private idForm:string = "main-form-adminForm";
    
    constructor(props:IAdminFormProps) {
        super(props);

        this.state = {
            mainForm: []
        };

        this._txtSearchController.dispatch(createTextFieldElement({ placeholder: "Buscar carpeta", label:"Buscar carpeta", onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => this._txtSearchController.dispatch({ type: ActionNameEnum.changeValue, payload: e.currentTarget.value }) }));
        this._lstTypeController.dispatch(createSelectElement({ placeholder: "Tipo de expediente", label: "Tipo de expediente", onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this._lstTypeController.dispatch({ type:ActionNameEnum.changeValue, payload }) }));
        this._lstDocumentalTypeController.dispatch(createSelectElement({ placeholder: "Tipo documental", label: "Tipo documental", onChange: (e: React.ChangeEvent<HTMLSelectElement>, payload:ISelectItemProps) => this.onChangeContentType(payload) }));
        this._btnSaveController.dispatch(createButtonElement({ 
            text:"Guardar",
            variant:"contained",
            color: "primary",
            className: "btn-guardar",
            onClick: (e) => this.saveDocument()
            
        }));
        this._btnCancelontroller.dispatch(createButtonElement({ 
            text:"Cancelar",
            variant: "outlined",
            color: "inherit",
            className: "btn-cancelar",
            onClick: (e) => this.clearFormData()
        }));
        
        this.loadColumns();

    }

    private loadColumns = async () => {
        const service = new ContentTypeService();
        /*const items = await service.getAllContentTypeAsync();        
        this._lstDocumentalTypeController.dispatch({ type: ActionNameEnum.loadItems, payload:items });*/
    }

    private onChangeContentType = async (item:ISelectItemProps) => {
        if(!item) {
            this.setState({...this.state, mainForm: [] });
            return;
        }
        
        const service = new ContentTypeService();
        this._lstDocumentalTypeController.dispatch({ type:ActionNameEnum.changeValue, payload: item });
        const response = await service.getAllFieldsByContentTypeAsync(item.value as string);
        
        let columns = response.map(x => {
            return {
                InternalName: x.InternalName,
                MaxLength: x.MaxLength,
                Title: x.Title,
                TypeAsString: x.TypeAsString
            };
        });

        let form = columns.map(x => {
            switch(x.TypeAsString){
                case 'Text':
                    return <TextField textField={{ id:x.InternalName, hidden: false, label: x.Title, placeholder: x.Title }} />;
                case 'Note':
                    return <TextField textField={{ id:x.InternalName, hidden: false, label: x.Title, placeholder: x.Title, multiline:true, rows:4 }} />;
                case 'DateTime':
                    return <DatePicker datePicker={{ id:x.InternalName, hidden: false, label: x.Title, format: "MM/dd/yyyy" }} />;
            }
            
        });

        this.setState({...this.state, mainForm: form });
    }

    private saveDocument = async () => {
        try {
            const service = new DocumentLibraryService();
            let pdf = this.createPDF();

            let documentType:ISelectItemProps = this._lstDocumentalTypeController.getState().value as ISelectItemProps;
            
            const form:NodeListOf<HTMLInputElement> = document.querySelectorAll(`#${this.idForm} input, #${this.idForm} textarea`);
            let body = { ContentTypeId: documentType.key };
            form.forEach(x => body[x.id] =  x.value );    
                       
            const file = await service.createFileAsync('probando.pdf',pdf, this._appContext.getState().properties.siteName, documentType.text);
            await service.updateFieldsFileAsync(file, body);
            this.clearFormData();

        } catch (error) {
            console.log(error);
        }            
    }    
    
    private createPDF = ():Blob => {
        try {
            const items = this._grid.getState().items.filter(x => x.selected === true);

            if(items.length == 0) {
                throw new Error("Seleccionar imagenes");
            }

            var doc = new jsPDF('p', 'pt','a4',true);
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();

            items.forEach(x => {
                doc.addImage(x.base64, 'PNG', 0, 0, width, height,'','FAST');
                doc.addPage();
            });
            
            //doc.save('demo.pdf')

            return doc.output('blob');
        } catch (error) {
            throw error;
        }
        
    }

    private clearFormData = () => {
        (document.getElementsByClassName('MuiAutocomplete-clearIndicator')[1] as HTMLElement).click();
    }

    public render() {
        return <Page mainForm={ this.state.mainForm } />;
    }
}