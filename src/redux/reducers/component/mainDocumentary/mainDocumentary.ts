import { changeView, createState } from "../../../actions/component/mainDocumentary/_actionName";
import { IAction } from "../../../namespace";
import { IMainDocumentary } from "./IMainDocumentary";

const defaultState:IMainDocumentary = {
    activeView: undefined,
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
        default:
            return state;
    }
}

export default reducer;