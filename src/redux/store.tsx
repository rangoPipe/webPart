import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import context from "./reducers/common/context";
import dialog from   "./reducers/general/dialog/dialog";
import detailList from "./reducers/general/detailList/detailList";
import textField from "./reducers/general/textField/textField";
import messageBar from "./reducers/general/messageBar/messageBar";
import commnadBar from "./reducers/general/commandBar/commadBar";
import button from "./reducers/general/button/button";
import choiceGroup from "./reducers/general/choiceGroup/choiceGroup";
import modal from "./reducers/general/modal/modal";
import dropdown from "./reducers/general/dropdown/dropdown";
import datePicker from "./reducers/general/datePicker/datePicker";
import checkbox from "./reducers/general/checkbox/checkbox";

import * as namespace from "./namespace";
import { SearchNameSpace, SendedNameSpace, ReceivedNameSpace, LendingNameSpace, PaybackNameSpace, ReportNameSpace } from "../enum/lending/lendingEnum";
import { OwnerNameSpace } from "../enum/owner/ownerEnum";
import { PendingNameSpace, ApprovedNameSpace, RejectedNameSpace } from "../enum/archivist/archivistEnum";

const reducer = combineReducers<any>({
    context: namespaced(namespace.contextNs)(context),
    detailList: namespaced(namespace.detailListNs)(detailList),
    detailList2: namespaced(namespace.detailList2Ns)(detailList),
    detailList3: namespaced(namespace.detailList3Ns)(detailList),
    detailList4: namespaced(namespace.detailList4Ns)(detailList),
    dialog: namespaced(namespace.dialogNs)(dialog),
    textField: namespaced(namespace.textFieldNs)(textField),
    messageBar: namespaced(namespace.messageBarNs)(messageBar),
    commandBar: namespaced(namespace.commandBarNs)(commnadBar),
    button: namespaced(namespace.buttonNS)(button),
    choiceGroup: namespaced(namespace.choiceGroupNS)(choiceGroup),
    modal: namespaced(namespace.modalNS)(modal),
    
    //Owner
    contextOwner: namespaced( OwnerNameSpace.context )(context),
    detailListOwner: namespaced( OwnerNameSpace.detailListOwner )(detailList),
    dialogOwner: namespaced( OwnerNameSpace.dialogOwner )(dialog),
    messageBarOwner: namespaced( OwnerNameSpace.messageBarOwner )(messageBar),
    textAreaOwner: namespaced( OwnerNameSpace.textAreaOwner )(textField),
    commandBarOwner: namespaced( OwnerNameSpace.commandBarOwner )(commnadBar),

    //Archivist-Pending
    contextPendingArchivist: namespaced( PendingNameSpace.context )(context),
    detailListPendingArchivist: namespaced( PendingNameSpace.detailList )(detailList),
    dialogPendingArchivist: namespaced( PendingNameSpace.dialog )(dialog),
    messageBarPendingArchivist: namespaced( PendingNameSpace.messageBar )(messageBar),
    textAreaPendingArchivist: namespaced( PendingNameSpace.textArea )(textField),
    commandBarPendingArchivist: namespaced( PendingNameSpace.commandBar )(commnadBar),

    //Archivist-Approved
    contextApprovedArchivist: namespaced( ApprovedNameSpace.context )(context),
    detailListApprovedArchivist: namespaced( ApprovedNameSpace.detailList )(detailList),

    //Archivist-Rejected
    contextRejectedArchivist: namespaced( RejectedNameSpace.context )(context),
    detailListRejectedArchivist: namespaced( RejectedNameSpace.detailList )(detailList),

    //Lending-Search
    contextSearch: namespaced( SearchNameSpace.context )(context),
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
    contextSended: namespaced( SendedNameSpace.context )(context),
    detailListSended: namespaced( SendedNameSpace.detailListSended )(detailList),
    commandBarSended: namespaced( SendedNameSpace.commandBarSended )(commnadBar),
    modalSended: namespaced( SendedNameSpace.modalSended )(modal),
    dialogSended: namespaced( SendedNameSpace.dialogSended )(dialog),

    //Lending-Received-Request
    contextReceived: namespaced( ReceivedNameSpace.context )(context),
    detailListReceived: namespaced( ReceivedNameSpace.detailListReceived )(detailList),
    commandBarReceived: namespaced( ReceivedNameSpace.commandBarReceived )(commnadBar),
    modalReceived: namespaced( ReceivedNameSpace.modalReceived )(modal),
    textAreaReceived: namespaced( ReceivedNameSpace.textAreaReceived )(textField),
    messageBarReceived: namespaced( ReceivedNameSpace.messageBarReceived )(messageBar),
    choiceGroupReceived: namespaced( ReceivedNameSpace.choiceGroupReceived )(choiceGroup),
    btnLeadReceived: namespaced( ReceivedNameSpace.btnLeadReceived )(button),

    //Lending-Lending
    contextLending: namespaced( LendingNameSpace.context )(context),
    detailListLending: namespaced( LendingNameSpace.detailListLending )(detailList),
    commandBarLending: namespaced( LendingNameSpace.commandBarLending )(commnadBar),
    dialogLending: namespaced( LendingNameSpace.dialogLending )(dialog),
    modalLending: namespaced( LendingNameSpace.modalLending )(modal),
    textAreaLending: namespaced( LendingNameSpace.textAreaLending )(textField),
    messageBarLending: namespaced( LendingNameSpace.messageBarLending )(messageBar),

    //Lending-Payback
    contextPayback: namespaced( PaybackNameSpace.context )(context),
    detailListPayback: namespaced( PaybackNameSpace.detailListPayback )(detailList),
    commandBarPayback: namespaced( PaybackNameSpace.commandBarPayback )(commnadBar),
    dialogPayback: namespaced( PaybackNameSpace.dialogPayback )(dialog),

    //Lending-Report
    contextReport: namespaced( ReportNameSpace.context )(context),
    detailListReport: namespaced( ReportNameSpace.detailListReport )(detailList),
    buttonSearchReport: namespaced( ReportNameSpace.buttonSearchReport )(button),
    buttonCancelReport: namespaced( ReportNameSpace.buttonCancelReport )(button),
    datePickerStartReport: namespaced( ReportNameSpace.datePickerStartReport )(datePicker),
    datePickerEndReport: namespaced( ReportNameSpace.datePickerEndReport )(datePicker),
    chkSendedReport: namespaced( ReportNameSpace.chkSendedReport )(checkbox),
    chkRequestReport: namespaced( ReportNameSpace.chkRequestReport )(checkbox),
    chkAcceptedReport: namespaced( ReportNameSpace.chkAcceptedReport )(checkbox),
    chkRejectedReport: namespaced( ReportNameSpace.chkRejectedReport )(checkbox),
    chkLendedReport: namespaced( ReportNameSpace.chkLendedReport )(checkbox),
    chkPaybackReport: namespaced( ReportNameSpace.chkPaybackReport )(checkbox)
});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;