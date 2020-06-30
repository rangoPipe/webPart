import { IAction, ActionNameEnum } from "../../../action";
import { ITextFieldProps } from "./ITextField";

const defaultState:ITextFieldProps = {
    id: null,
    label: null,
    hidden: false,
    value: undefined,
    style: undefined,
    onChange: undefined,
    multiline: false,
    rows: 1,

};

function reducer(state = defaultState, { type, payload }:IAction) : ITextFieldProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.changeLabel: {                                  
            return {
                ...state,
                label : payload
            };
        }
        case ActionNameEnum.changeValue: {                                  
            return {
                ...state,
                value : payload
            };
        }
        case ActionNameEnum.hideElement: {                                  
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