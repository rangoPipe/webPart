import { createCheck, hideElement } from "../../../actions/general/check/_actionName";
import { IAction } from "../../../namespace";
import { ICheckProps } from "./ICheck";

const defaultState:ICheckProps = {
    type: "checkbox",
    label: undefined,
    hidden: false
};

function reducer(state = defaultState, { type, payload }:IAction) : ICheckProps {    
    switch(type) {
        case createCheck: {                                  
            return {
                ...state,
                ...payload
            };
        }

        case hideElement: {                                  
            return {
                ...state,
                hidden: payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;