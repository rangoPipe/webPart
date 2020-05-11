import { createControl, hideControl, changeText } from "../../../actions/general/control/_actionName";
import { IAction } from "../../../namespace";
import { IControlProps } from "./IControl";

const defaultState:IControlProps = {
    type:"text",
    label: null
};

function reducer(state = defaultState, { type, payload }:IAction) : IControlProps {    
    switch(type) {
        case createControl: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case changeText: {                                  
            return {
                ...state,
                value : payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;