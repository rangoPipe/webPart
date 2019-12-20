import { createModal } from "../../../actions/general/modal/_actionName";
import { IAction } from "../../../namespace";
import { IModalProps } from "./IModalProps";

const defaultState:IModalProps = {
    content:null,
    header:null
};

function reducer(state = defaultState, { type, payload }:IAction) : IModalProps {    
    switch(type) {
        case createModal: {                                  
            return {
                ...state,
                ...payload
            };
        }
        default:
            return state;
    }
}

export default reducer;