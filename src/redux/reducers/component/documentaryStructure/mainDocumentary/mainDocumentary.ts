import { changeView, createState, selectTreeItem, onChangeView } from "../../../../actions/component/documentaryStructure/mainDocumentary/_actionName";
import { IAction } from "../../../../namespace";
import { IMainDocumentary } from "./IMainDocumentary";

const defaultState:IMainDocumentary = {
    activeView: undefined,
    itemSelected: undefined,
    parent: undefined,
    onChangeView: () => {}
};

function reducer(state = defaultState, { type, payload }:IAction) : IMainDocumentary {    
    switch(type) {
        case createState: {
            return {
                ...state,
                ...payload
            };
        }
        case changeView: {
            return {
                ...state,
                activeView : payload
            };
        }
        case selectTreeItem: {
            return {
                ...state,
                parent: payload.parent,
                itemSelected: payload.itemSelected
            };
        }
        case onChangeView: {
            return {
                ...state,
                onChangeView: payload
            };
        }
        default:
            return state;
    }
}

export default reducer;