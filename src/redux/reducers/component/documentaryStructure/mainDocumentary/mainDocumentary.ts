import { IAction, ActionNameEnum } from "../../../../action";
import { IMainDocumentary } from "./IMainDocumentary";

const defaultState:IMainDocumentary = {
    activeView: undefined,
    itemSelected: undefined,
    parent: undefined,
    onChangeView: () => {}
};

function reducer(state = defaultState, { type, payload }:IAction) : IMainDocumentary {    
    switch(type) {
        case ActionNameEnum.createElemet: {
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.changeView: {
            return {
                ...state,
                activeView : payload
            };
        }
        case ActionNameEnum.selectTreeItem: {
            return {
                ...state,
                parent: payload.parent,
                itemSelected: payload.itemSelected
            };
        }
        case ActionNameEnum.onChangeView: {
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