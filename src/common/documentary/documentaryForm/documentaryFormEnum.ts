import { ISelectItemProps } from "../../../redux/reducers/general/select/ISelect";

export enum DocumentaryFormEnum {
    contextDocumentaryForm = "contextDocumentaryForm",
    btnSave = "btnSaveDocumentaryForm",
    btnCancel = "btnCancelDocumentaryForm",
    txtId = "txtIdDocumentaryForm",
    txtCodigo = "txtCodigoDocumentaryForm",
    txtNombre = "txtNombreDocumentaryForm",
    lstSecurity = "lstSecurityDocumentaryForm",
    lstGestion = "lstGestionDocumentaryForm",
    lstHistory = "lstHistoryDocumentaryForm",
    lstCentral = "lstCentralDocumentaryForm",
    lstColumn = "lstColumnDocumentaryForm",
    chkDelete = "chkDeleteDocumentaryForm",
    chkDigitize = "chkDigitizeDocumentaryForm",
    chkSelect = "chkSelectDocumentaryForm",
    chkKeep = "chkKeepDocumentaryForm",
}

export enum TypeFolderEnum {
    Fondo = "Fondo",
    Seccion = "Seccion",
    Subseccion = "Subseccion",
    Serie = "Serie",
    Subserie = "Subserie",
    TipoDocumental = "TipoDocumental",
}

export const times:ISelectItemProps[] = [
    { text: "6 meses", key: 1, value: 6 },
    { text: "12 meses", key: 2, value: 12 },
    { text: "18 meses", key: 3, value: 18 },
    { text: "24 meses", key: 4, value: 24 }
];