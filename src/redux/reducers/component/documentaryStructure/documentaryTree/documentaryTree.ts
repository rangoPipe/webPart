import { loadItems } from "../../../../actions/component/documentaryStructure/documentaryTree/_actionName";
import { IAction } from "../../../../namespace";
import { IDocumentaryTree } from "./IDocumentaryTree";

const defaultState:IDocumentaryTree = {
    loadItems: () => {}
};

function reducer(state = defaultState, { type, payload }:IAction) : IDocumentaryTree {    
    switch(type) {
        case loadItems: {
            return {
                ...state,
                loadItems: payload
            };
        }
        default:
            return state;
    }
}

export default reducer;