import { IAction, ActionNameEnum } from "../../../../action";
import { IDocumentaryTree } from "./IDocumentaryTree";

const defaultState:IDocumentaryTree = {
    loadItems: () => {}
};

function reducer(state = defaultState, { type, payload }:IAction) : IDocumentaryTree {    
    switch(type) {
        case ActionNameEnum.loadItems: {
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