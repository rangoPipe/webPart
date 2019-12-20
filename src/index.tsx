import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@uifabric/icons";
import { Provider } from 'react-redux'
import store from './redux/store';

import Lending from "./webparts/lending/components/main";
initializeIcons();

const page = (
<Provider store={store}>
    <Lending/>
</Provider>
);

ReactDOM.render(page, document.getElementById("root"));