import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import context from "./reducers/common/context";
import dialog from   "./reducers/general/dialog/dialog";
import detailList from "./reducers/general/detailList/detailList";
import textField from "./reducers/general/textField/textField";
import messageBar from "./reducers/general/messageBar/messageBar";
import commadBar from "./reducers/general/commandBar/commadBar";
import button from "./reducers/general/button/button";
import choiceGroup from "./reducers/general/choiceGroup/choiceGroup";
import modal from "./reducers/general/modal/modal";
import * as namespace from "./namespace";
import { LendingNameSpace } from "../enum/lending/lendingEnum";

const reducer = combineReducers<any>({
    context: namespaced(namespace.contextNs)(context),
    detailList: namespaced(namespace.detailListNs)(detailList),
    detailList2: namespaced(namespace.detailList2Ns)(detailList),
    detailList3: namespaced(namespace.detailList3Ns)(detailList),
    detailList4: namespaced(namespace.detailList4Ns)(detailList),
    dialog: namespaced(namespace.dialogNs)(dialog),
    textField: namespaced(namespace.textFieldNs)(textField),
    messageBar: namespaced(namespace.messageBarNs)(messageBar),
    commandBar: namespaced(namespace.commandBarNs)(commadBar),
    button: namespaced(namespace.buttonNS)(button),
    choiceGroup: namespaced(namespace.choiceGroupNS)(choiceGroup),
    modal: namespaced(namespace.modalNS)(modal),

    //Lending
    detailListSearch: namespaced( LendingNameSpace.detailListSearch )(detailList),
});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;