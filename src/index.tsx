import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@uifabric/icons";
import { Provider } from 'react-redux'
import store from './redux/store';

//import Lending from "./webparts/lending/components/main";
import Owner from "./webparts/transfer/components/owner";
initializeIcons();

const page = (
<Provider store={store}>
    <Owner/>
</Provider>
);

ReactDOM.render(page, document.getElementById("root"));