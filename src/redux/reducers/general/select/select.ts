import { createSelect, loadItems, onChange, hideElement, changeValue } from "../../../actions/general/select/_actionName";
import { IAction } from "../../../namespace";
import { ISelectProps } from "./ISelect";

const defaultState:ISelectProps = {
    label: undefined,
    onChange: undefined,
    disabled: false,
    hidden: false,
    className: undefined,
    items: [],
    value: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : ISelectProps {    
    switch(type) {
        case createSelect: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case loadItems: {                                  
            return {
                ...state,
                hidden : payload
            };
        }
        case onChange: {                                  
            return {
                ...state,
                onChange : payload
            };
        }
        case hideElement: {                                  
            return {
                ...state,
                hidden : payload
            };
        }
        case changeValue: {                                  
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