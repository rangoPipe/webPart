import { createCheck, hideElement, onChange, changeValue } from "../../../actions/general/check/_actionName";
import { IAction } from "../../../namespace";
import { ICheckProps } from "./ICheck";

const defaultState:ICheckProps = {
    type: "checkbox",
    label: undefined,
    hidden: false,
    checked: false,
    onClick: undefined,
    onChange: undefined
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
        case onChange: {
            return {
                ...state,
                onChange: payload
            };
        }
        case changeValue: {                                  
            return {
                ...state,
                checked : payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;