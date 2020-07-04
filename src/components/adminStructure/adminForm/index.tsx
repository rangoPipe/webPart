import * as React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
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
    private _appSnackbar = subspace( (state: IStore) => state.appSnackbar, MainAppEnum.snackbar )(store);

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
        const items = [{"text":"Actas","value":"0x010100CBEA0CF21B576347A4303936DDCD4B87","key":"0x010100CBEA0CF21B576347A4303936DDCD4B87"},{"text":"ACTAS - FH","value":"0x010100083E48780323B54680D1B963EAEA8391","key":"0x010100083E48780323B54680D1B963EAEA8391"},{"text":"ACTAS DE ENTREGA FUNDACION HACEB","value":"0x01010063E8D140A854DC40A8C9E8D12AA4C073","key":"0x01010063E8D140A854DC40A8C9E8D12AA4C073"},{"text":"ACTAS DE MICROFILMACION","value":"0x010100F824F4AF16342A449F9DE689CAF17B45","key":"0x010100F824F4AF16342A449F9DE689CAF17B45"},{"text":"AFILIACIONES FEDEHACEB","value":"0x010100D8019A4AEFDECB41B82D4B3FB8460B8B","key":"0x010100D8019A4AEFDECB41B82D4B3FB8460B8B"},{"text":"AGREMIACIONES","value":"0x0101005341578A915BE54C8C645117A49C0262","key":"0x0101005341578A915BE54C8C645117A49C0262"},{"text":"My Content Type Prueba","value":"0x0100C4EF01369C89A44C8A0FDE9B7C71A798","key":"0x0100C4EF01369C89A44C8A0FDE9B7C71A798"},{"text":"Prueba","value":"0x010100E23DA0405FE02A40A4592F75A0DB3B9C","key":"0x010100E23DA0405FE02A40A4592F75A0DB3B9C"},{"text":"Prueba de campos","value":"0x01010085C68E572A56D342B2FE463F93B07313","key":"0x01010085C68E572A56D342B2FE463F93B07313"},{"text":"PruebaDaniela","value":"0x0101004801A09FB7821541BC3BE06D8249F515","key":"0x0101004801A09FB7821541BC3BE06D8249F515"},{"text":"PruebaDocumento","value":"0x010100AB49A62786D0F840A93646C86ACF5A63","key":"0x010100AB49A62786D0F840A93646C86ACF5A63"}];       
        this._lstDocumentalTypeController.dispatch({ type: ActionNameEnum.loadItems, payload:items });
    }

    private onChangeContentType = async (item:ISelectItemProps) => {
        if(!item) {
            this.setState({...this.state, mainForm: [] });
            return;
        }
        
        const service = new ContentTypeService();
        this._lstDocumentalTypeController.dispatch({ type:ActionNameEnum.changeValue, payload: item });
        const response = [
          {
            "odata.type": "SP.FieldText",
            "odata.id":
              "https://paradigmasoln.sharepoint.com/sites/HACEBDev/_api/Web/AvailableFields(guid'b6275a39-17ba-4588-ba3f-63d5447a5a97')",
            "odata.editLink":
              "Web/AvailableFields(guid'b6275a39-17ba-4588-ba3f-63d5447a5a97')",
            AutoIndexed: false,
            CanBeDeleted: true,
            ClientSideComponentId: "00000000-0000-0000-0000-000000000000",
            ClientSideComponentProperties: null,
            ClientValidationFormula: null,
            ClientValidationMessage: null,
            CustomFormatter: null,
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Actividad",
            Filterable: true,
            FromBaseType: false,
            Group: "HACEB",
            Hidden: false,
            Id: "b6275a39-17ba-4588-ba3f-63d5447a5a97",
            Indexed: false,
            IndexStatus: 0,
            InternalName: "Actividad",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: false,
            SchemaXml:
              '<Field Type="Text" DisplayName="Actividad" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" MaxLength="255" Group="HACEB" ID="{b6275a39-17ba-4588-ba3f-63d5447a5a97}" SourceID="{4a084f28-2066-427b-ae64-d36cd8c4d77f}" StaticName="Actividad" Name="Actividad" Version="1" Customization="" />',
            Scope: "/sites/HACEBDev",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: true,
            StaticName: "Actividad",
            Title: "Actividad",
            FieldTypeKind: 2,
            TypeAsString: "Text",
            TypeDisplayName: "Una línea de texto",
            TypeShortDescription: "Una línea de texto",
            ValidationFormula: null,
            ValidationMessage: null,
            MaxLength: 255,
          },
          {
            "odata.type": "SP.FieldText",
            "odata.id":
              "https://paradigmasoln.sharepoint.com/sites/HACEBDev/_api/Web/AvailableFields(guid'8058f973-9a52-421f-bb9c-1984695e2ab2')",
            "odata.editLink":
              "Web/AvailableFields(guid'8058f973-9a52-421f-bb9c-1984695e2ab2')",
            AutoIndexed: false,
            CanBeDeleted: true,
            ClientSideComponentId: "00000000-0000-0000-0000-000000000000",
            ClientSideComponentProperties: null,
            ClientValidationFormula: null,
            ClientValidationMessage: null,
            CustomFormatter: "",
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Ano",
            Filterable: true,
            FromBaseType: false,
            Group: "HACEB",
            Hidden: false,
            Id: "8058f973-9a52-421f-bb9c-1984695e2ab2",
            Indexed: false,
            IndexStatus: 0,
            InternalName: "Ano",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: false,
            SchemaXml:
              '<Field Type="Text" DisplayName="Año" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" MaxLength="4" Group="HACEB" ID="{8058f973-9a52-421f-bb9c-1984695e2ab2}" SourceID="{4a084f28-2066-427b-ae64-d36cd8c4d77f}" StaticName="Ano" Name="Ano" Version="2" CustomFormatter="" Customization="" />',
            Scope: "/sites/HACEBDev",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: true,
            StaticName: "Ano",
            Title: "Año",
            FieldTypeKind: 2,
            TypeAsString: "Text",
            TypeDisplayName: "Una línea de texto",
            TypeShortDescription: "Una línea de texto",
            ValidationFormula: null,
            ValidationMessage: null,
            MaxLength: 4,
          },
          
          {
            "odata.type": "SP.FieldMultiLineText",
            "odata.id":
              "https://paradigmasoln.sharepoint.com/sites/HACEBDev/_api/Web/AvailableFields(guid'196c204c-b8a7-433a-9921-5440100c96f3')",
            "odata.editLink":
              "Web/AvailableFields(guid'196c204c-b8a7-433a-9921-5440100c96f3')",
            AutoIndexed: false,
            CanBeDeleted: true,
            ClientSideComponentId: "00000000-0000-0000-0000-000000000000",
            ClientSideComponentProperties: null,
            ClientValidationFormula: null,
            ClientValidationMessage: null,
            CustomFormatter: "",
            DefaultFormula: null,
            DefaultValue: null,
            Description: "",
            Direction: "none",
            EnforceUniqueValues: false,
            EntityPropertyName: "Descripcion",
            Filterable: false,
            FromBaseType: false,
            Group: "HACEB",
            Hidden: false,
            Id: "196c204c-b8a7-433a-9921-5440100c96f3",
            Indexed: false,
            IndexStatus: 0,
            InternalName: "Descripcion",
            JSLink: "clienttemplates.js",
            PinnedToFiltersPane: false,
            ReadOnlyField: false,
            Required: false,
            SchemaXml:
              '<Field Type="Note" DisplayName="Descripción" Required="FALSE" EnforceUniqueValues="FALSE" Indexed="FALSE" NumLines="6" RichText="TRUE" RichTextMode="FullHtml" IsolateStyles="TRUE" Sortable="FALSE" Group="HACEB" ID="{196c204c-b8a7-433a-9921-5440100c96f3}" SourceID="{4a084f28-2066-427b-ae64-d36cd8c4d77f}" StaticName="Descripcion" Name="Descripcion" Version="2" CustomFormatter="" RestrictedMode="TRUE" AppendOnly="FALSE" UnlimitedLengthInDocumentLibrary="FALSE" Customization="" />',
            Scope: "/sites/HACEBDev",
            Sealed: false,
            ShowInFiltersPane: 0,
            Sortable: false,
            StaticName: "Descripcion",
            Title: "Descripción",
            FieldTypeKind: 3,
            TypeAsString: "Note",
            TypeDisplayName: "Varias líneas de texto",
            TypeShortDescription: "Varias líneas de texto",
            ValidationFormula: null,
            ValidationMessage: null,
            AllowHyperlink: false,
            AppendOnly: false,
            NumberOfLines: 6,
            RestrictedMode: true,
            RichText: true,
            UnlimitedLengthInDocumentLibrary: false,
            WikiLinking: false,
          },
        ];
        
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

    private createPDF = ():Blob => {
        try {
            const items = this._grid.getState().items.filter(x => x.selected === true);

            var doc = new jsPDF('p', 'pt','a4',true);
            var width = doc.internal.pageSize.getWidth();
            var height = doc.internal.pageSize.getHeight();

            items.forEach(x => {
                doc.addImage(x.base64, 'PNG', 0, 0, width, height,'','FAST');
                doc.addPage();
            });

            return doc.output('blob');
        } catch (error) {
            throw error;
        }
        
    }

    private saveDocument = async () => {
        try {
            
            this.validateFormData();
            const service = new DocumentLibraryService();
            let pdf = this.createPDF();

            let documentType:ISelectItemProps = this._lstDocumentalTypeController.getState().value as ISelectItemProps;
            
            const form:NodeListOf<HTMLInputElement> = document.querySelectorAll(`#${this.idForm} input, #${this.idForm} textarea`);
            let body = { ContentTypeId: documentType.key };
            form.forEach(x => body[x.id] =  x.value );    
                       
            const file = await service.createFileAsync('probando.pdf',pdf, this._appContext.getState().properties.siteName, documentType.text);
            await service.updateFieldsFileAsync(file, body);
            this.clearFormData();          
            this.showSnackbar("Proceso exitoso", "success");
        } catch (error) {
            this.showSnackbar(error);
            this._btnSaveController.dispatch({type: ActionNameEnum.changeView, payload: undefined });
        }            
    }    
    

    private clearFormData = () => {
        (document.getElementsByClassName('MuiAutocomplete-clearIndicator')[1] as HTMLElement).click();
        this._lstDocumentalTypeController.dispatch({ type:ActionNameEnum.changeValue, payload: undefined });
        this._btnSaveController.dispatch({type: ActionNameEnum.changeView, payload: undefined });
        this._btnSaveController.dispatch({type: ActionNameEnum.disableElement, payload: false });

        const items = this._grid.getState().items;
        items.forEach(x => x.selected = false );
        this._grid.dispatch({type: ActionNameEnum.changeValue, payload: items });
    }

    private validateFormData = () => {
        try {
            this.showSnackbar("Procesando...", "info");
            this._btnSaveController.dispatch({type: ActionNameEnum.disableElement, payload: true });
            this._btnSaveController.dispatch({type: ActionNameEnum.changeView, payload: <FontAwesomeIcon icon={faRedo} spin={true} /> });
           
            if(!this._lstDocumentalTypeController.getState().value){
                throw 'Debe seleccionar un tipo documental';
            }

            if(this._grid.getState().items.filter(x => x.selected === true).length === 0) {
                throw "Debe Seleccionar alguna imagen";
            }
            
        } catch (error) {
            this.clearFormData();
            throw error;
        }
    }

    private showSnackbar = (message:string, severity="warning") => {
        this._appSnackbar.dispatch({ type: ActionNameEnum.createElemet, payload: { 
            show: true, 
            message, 
            severity,
            onClose: () => this._appSnackbar.dispatch({ type: ActionNameEnum.hideElement, payload: false })
        }});
    }

    public render() {
        return <Page mainForm={ this.state.mainForm } />;
    }
}