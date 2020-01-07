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
import dropdown from "./reducers/general/dropdown/dropdown";

import * as namespace from "./namespace";
import { SearchNameSpace, SendedNameSpace, ReceivedNameSpace, LendingNameSpace, PaybackNameSpace } from "../enum/lending/lendingEnum";

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

    //Lending-Search
    detailListSearch: namespaced( SearchNameSpace.detailListSearch )(detailList),
    dropDownSectionSearch: namespaced( SearchNameSpace.dropDownSectionSearch )(dropdown),
    dropDownSubsectionSearch: namespaced( SearchNameSpace.dropDownSubsectionSearch )(dropdown),
    dropDownSerieSearch: namespaced( SearchNameSpace.dropDownSerieSearch )(dropdown),
    dropDownSubserieSearch: namespaced( SearchNameSpace.dropDownSubserieSearch )(dropdown),
    buttonSearchSearch: namespaced( SearchNameSpace.buttonSearchSearch )(button),
    buttonCancelSearch: namespaced( SearchNameSpace.buttonCancelSearch )(button),
    buttonLendSearch: namespaced( SearchNameSpace.buttonLendSearch )(button),
    modalSearch: namespaced( SearchNameSpace.modalSearch )(modal),
    textAreaSearch: namespaced( SearchNameSpace.textAreaSearch )(textField),
    messageBarSearch: namespaced( SearchNameSpace.messageBarSearch )(messageBar),

    //Lending-Sended-Request    
    detailListSended: namespaced( SendedNameSpace.detailListSended )(detailList),
    commandBarSended: namespaced( SendedNameSpace.commandBarSended )(commadBar),
    modalSended: namespaced( SendedNameSpace.modalSended )(modal),
    dialogSended: namespaced( SendedNameSpace.dialogSended )(dialog),

    //Lending-Received-Request
    detailListReceived: namespaced( ReceivedNameSpace.detailListReceived )(detailList),
    commandBarReceived: namespaced( ReceivedNameSpace.commandBarReceived )(commadBar),
    modalReceived: namespaced( ReceivedNameSpace.modalReceived )(modal),
    textAreaReceived: namespaced( ReceivedNameSpace.textAreaReceived )(textField),
    messageBarReceived: namespaced( ReceivedNameSpace.messageBarReceived )(messageBar),
    choiceGroupReceived: namespaced( ReceivedNameSpace.choiceGroupReceived )(choiceGroup),
    btnLeadReceived: namespaced( ReceivedNameSpace.btnLeadReceived )(button),

    //Lending-Lending
    detailListLending: namespaced( LendingNameSpace.detailListLending )(detailList),
    commandBarLending: namespaced( LendingNameSpace.commandBarLending )(commadBar),
    dialogLending: namespaced( LendingNameSpace.dialogLending )(dialog),

    //Lending-Payback
    detailListPayback: namespaced( PaybackNameSpace.detailListPayback )(detailList),
    commandBarPayback: namespaced( PaybackNameSpace.commandBarPayback )(commadBar),
    dialogPayback: namespaced( PaybackNameSpace.dialogPayback )(dialog),
});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;