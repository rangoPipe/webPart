import { createControl, changeLabel, hideControl, changeValue } from "../../../actions/general/control/_actionName";
import { IAction } from "../../../namespace";
import { IControlProps } from "./IControl";

const defaultState:IControlProps = {
    type:"text",
    label: null,
    hidden: false,
    value: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : IControlProps {    
    switch(type) {
        case createControl: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case changeLabel: {                                  
            return {
                ...state,
                label : payload
            };
        }
        case changeValue: {                                  
            return {
                ...state,
                value : payload
            };
        }
        case hideControl: {                                  
            return {
                ...state,
                hidden : payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;