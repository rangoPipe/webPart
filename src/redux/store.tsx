import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import { DocumentaryTreeEnum } from "../common/documentary/documentaryTree/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../common/documentary/main/mainDocumentaryEnum";

import context from "./reducers/common/context";
import button from "./reducers/general/button/button";
import control from "./reducers/general/control/control";
import select from "./reducers/general/select/select";
import check from "./reducers/general/check/check";

import mainDocumentary from "./reducers/component/documentaryStructure/mainDocumentary/mainDocumentary";
import documentaryTree from "./reducers/component/documentaryStructure/documentaryTree/documentaryTree";

import { DocumentaryFormEnum } from "../common/documentary/documentaryForm/documentaryFormEnum";

const reducer = combineReducers<any>({
    //DocumentaryMain
    stateMainDocumentary: namespaced(MainDocumentaryEnum.state)(mainDocumentary),

    //DocumentaryForm
    btnSaveDocumentaryForm: namespaced(DocumentaryFormEnum.btnSave)(button),
    btnCancelDocumentaryForm: namespaced(DocumentaryFormEnum.btnCancel)(button),
    txtIdDocumentaryForm: namespaced(DocumentaryFormEnum.txtId)(control),
    txtCodigoDocumentaryForm: namespaced(DocumentaryFormEnum.txtCodigo)(control),
    txtNombreDocumentaryForm: namespaced(DocumentaryFormEnum.txtNombre)(control),
    lstSecurityDocumentaryForm: namespaced(DocumentaryFormEnum.lstSecurity)(select),
    lstCentralDocumentaryForm: namespaced(DocumentaryFormEnum.lstCentral)(select),
    lstGestionDocumentaryForm: namespaced(DocumentaryFormEnum.lstGestion)(select),
    lstHistoryDocumentaryForm: namespaced(DocumentaryFormEnum.lstHistory)(select),
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

});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;