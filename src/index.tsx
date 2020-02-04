import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@uifabric/icons";
import { Provider } from 'react-redux'
import { subspace, Subspace } from 'redux-subspace';
import store from './redux/store';

import Main from "./components/main";
import { createContext } from "./redux/actions/common/_actionName";
import { IIOIPStore } from './redux/namespace';
import { IContextProps } from './redux/reducers/common/IContextProps';
import { SearchNameSpace, SendedNameSpace, ReceivedNameSpace, LendingNameSpace, PaybackNameSpace, ReportNameSpace } from './enum/lending/lendingEnum';
import { ApprovedNameSpace, PendingNameSpace, RejectedNameSpace } from './enum/archivist/archivistEnum';
import { OwnerNameSpace } from './enum/owner/ownerEnum';
initializeIcons();

  const _contextOwnerController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextOwner, OwnerNameSpace.context)(store);

  const _contextPendingController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextPendingArchivist, PendingNameSpace.context)(store);
  const _contextApprovedController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextApprovedArchivist, ApprovedNameSpace.context)(store);
  const _contextRejectedController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextRejectedArchivist, RejectedNameSpace.context)(store);
  
  const _contextSearchController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextSearch, SearchNameSpace.context)(store);
  const _contextSendedController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextSended, SendedNameSpace.context)(store);
  const _contextReceivedController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextReceived, ReceivedNameSpace.context)(store);
  const _contextLendingController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextLending, LendingNameSpace.context)(store);
  const _contextPaybackController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextPayback, PaybackNameSpace.context)(store);
  const _contextReportController: Subspace<IContextProps, any, IIOIPStore> = subspace((state: IIOIPStore) => state.contextReport, ReportNameSpace.context)(store);
  
  const payload = { 
    connectionString:  "https://localhost:44352"
   };

   _contextOwnerController.dispatch({ type: createContext, payload });

   _contextPendingController.dispatch({ type: createContext, payload });
   _contextApprovedController.dispatch({ type: createContext, payload });
   _contextRejectedController.dispatch({ type: createContext, payload }); 

   _contextSearchController.dispatch({ type: createContext, payload });
   _contextSendedController.dispatch({ type: createContext, payload });
   _contextReceivedController.dispatch({ type: createContext, payload }); 
   _contextLendingController.dispatch({ type: createContext, payload });
   _contextPaybackController.dispatch({ type: createContext, payload });
   _contextReportController.dispatch({ type: createContext, payload });    


const page = (
<Provider store={store}>
    <Main key = { Math.random().toString() }  title = { "Main IOIP" } />
</Provider>
);

ReactDOM.render(page, document.getElementById("root"));