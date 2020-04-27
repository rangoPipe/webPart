import { createStore, combineReducers } from "redux";
import { namespaced } from 'redux-subspace';

import context from "./reducers/common/context";
import button from "./reducers/general/button/button";
import * as namespace from "./namespace";


const reducer = combineReducers<any>({
    context: namespaced(namespace.contextNs)(context),
    button: namespaced(namespace.buttonNS)(button)

});

const store = createStore(reducer);

store.subscribe( () => {   
});

export default store;