import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@uifabric/icons";
import { Provider } from 'react-redux'
import store from './redux/store';

//import Lending from "./webparts/lending/components/main";
//import Owner from "./webparts/transfer/components/owner";
import Archivist from "./webparts/transfer/components/archivist/main";
initializeIcons();

const page = (
<Provider store={store}>
    <Archivist/>
</Provider>
);

ReactDOM.render(page, document.getElementById("root"));