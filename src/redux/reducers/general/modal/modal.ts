import { createModal, createContent } from "../../../actions/general/modal/_actionName";
import { IAction } from "../../../namespace";
import { IModalProps } from "./IModalProps";

const defaultState:IModalProps = {
    content:null,
    header:null,
    isOpen: false,
    onDismiss : () => {}
};

function reducer(state = defaultState, { type, payload }:IAction) : IModalProps {    
    switch(type) {
        case createModal: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case createContent: {                                  
            return {
                ...state,
                content: payload
            };
        }
        default:
            return state;
    }
}

export default reducer;