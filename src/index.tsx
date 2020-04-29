import React from 'react';
import ReactDOM from 'react-dom';
import { initializeIcons } from "@uifabric/icons";
import { Provider } from 'react-redux'
import store from './redux/store';
import 'bootstrap/dist/css/bootstrap.min.css';
import DocumentaryMain from "./components/documentaryStructure/main";

initializeIcons();


const page = (
<Provider store={store}>
    <DocumentaryMain />
</Provider>
);

ReactDOM.render(page, document.getElementById("root"));