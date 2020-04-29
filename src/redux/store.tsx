import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import { DocumentaryTreeEnum } from "../common/documentary/documentaryTree/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../common/documentary/main/mainDocumentaryEnum";

import context from "./reducers/common/context";
import button from "./reducers/general/button/button";

import mainDocumentary from "./reducers/component/mainDocumentary/mainDocumentary";

const reducer = combineReducers<any>({
    //DocumentaryMain
    stateMainDocumentary: namespaced(MainDocumentaryEnum.state)(mainDocumentary),

    //Documentary Tree
    contextDocumentary: namespaced(DocumentaryTreeEnum.contextDocumentary)(context),
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