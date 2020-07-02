import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import { DocumentaryTreeEnum } from "../common/documentary/documentaryTree/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../common/documentary/main/mainDocumentaryEnum";
import { AdminFormEnum } from "../common/admin/adminForm/adminFormContent";

import button from "./reducers/general/button/button";
import control from "./reducers/general/control/control";
import textField from "./reducers/general/textField/textField";
import select from "./reducers/general/select/select";
import check from "./reducers/general/check/check";
import grid from "./reducers/general/grid/grid";
import viewer from "./reducers/general/viewer/viewer";
import snackbar from "./reducers/general/snackbar/snackbar";

import context from "./reducers/webPart/context";
import mainDocumentary from "./reducers/component/documentaryStructure/mainDocumentary/mainDocumentary";
import documentaryTree from "./reducers/component/documentaryStructure/documentaryTree/documentaryTree";

import { DocumentaryFormEnum } from "../common/documentary/documentaryForm/documentaryFormEnum";
import { MainAppEnum } from "../common/mainApp/main/mainAppContent";
import { AdminListEnum } from "../common/admin/adminList/adminListContent";
import { AdminViewEnum } from "../common/admin/adminView/adminViewContent";

const reducer = combineReducers<any>({
    
    //MainApp
    appContext: namespaced(MainAppEnum.context)(context),
    appSnackbar: namespaced(MainAppEnum.snackbar)(snackbar),
    btnAdminMainApp: namespaced(MainAppEnum.btnAdmin)(button),
    btnStructureMainApp: namespaced(MainAppEnum.btnStructure)(button),
    btnSearchMainApp: namespaced(MainAppEnum.btnSearch)(button),

    //DocumentaryMain
    stateMainDocumentary: namespaced(MainDocumentaryEnum.state)(mainDocumentary),

    //DocumentaryForm
    btnSaveDocumentaryForm: namespaced(DocumentaryFormEnum.btnSave)(button),
    btnCancelDocumentaryForm: namespaced(DocumentaryFormEnum.btnCancel)(button),
    txtIdDocumentaryForm: namespaced(DocumentaryFormEnum.txtId)(control),
    txtCodigoDocumentaryForm: namespaced(DocumentaryFormEnum.txtCodigo)(textField),
    txtNombreDocumentaryForm: namespaced(DocumentaryFormEnum.txtNombre)(textField),
    lstSecurityDocumentaryForm: namespaced(DocumentaryFormEnum.lstSecurity)(select),
    lstCentralDocumentaryForm: namespaced(DocumentaryFormEnum.lstCentral)(select),
    lstGestionDocumentaryForm: namespaced(DocumentaryFormEnum.lstGestion)(select),
    lstHistoryDocumentaryForm: namespaced(DocumentaryFormEnum.lstHistory)(select),
    lstColumnDocumentaryForm: namespaced(DocumentaryFormEnum.lstColumn)(select),
    chkKeepDocumentaryForm: namespaced(DocumentaryFormEnum.chkKeep)(check),
    chkSelectDocumentaryForm: namespaced(DocumentaryFormEnum.chkSelect)(check),
    chkDigitizeDocumentaryForm: namespaced(DocumentaryFormEnum.chkDigitize)(check),
    chkDeleteDocumentaryForm: namespaced(DocumentaryFormEnum.chkDelete)(check),

    
    //Documentary Tree
    stateDocumentaryTree: namespaced(DocumentaryTreeEnum.state)(documentaryTree),
    btnFondoDocumentary: namespaced(DocumentaryTreeEnum.btnFondo)(button),
    btnSeccionDocumentary: namespaced(DocumentaryTreeEnum.btnSeccion)(button),
    btnSubseccionDocumentary: namespaced(DocumentaryTreeEnum.btnSubseccion)(button),
    btnSerieDocumentary: namespaced(DocumentaryTreeEnum.btnSerie)(button),
    btnSubserieDocumentary: namespaced(DocumentaryTreeEnum.btnSubserie)(button),
    btnTipoDocumentary: namespaced(DocumentaryTreeEnum.btnTipo)(button),

    //Admin Form 
    txtSearchAdminForm: namespaced(AdminFormEnum.txtSearch)(textField),
    lstTypeAdminForm: namespaced(AdminFormEnum.lstType)(select),
    lstDocumentalTypeAdminForm: namespaced(AdminFormEnum.lstDocumentalType)(select),
    btnSaveAdminForm: namespaced(AdminFormEnum.btnSave)(button),
    btnCancelAdminForm: namespaced(AdminFormEnum.btnCancel)(button),

    //Admin List
    gridListAdmin: namespaced(AdminListEnum.grid)(grid),

    //Admin View
    viewerAdminView: namespaced(AdminViewEnum.viewer)(viewer),
});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;