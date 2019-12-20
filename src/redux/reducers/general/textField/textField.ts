import { createTextField, changeTextField } from "../../../actions/general/textField/_actionName";
import { IAction } from "../../../namespace";
import { ITextFieldProps } from "./ITextFieldProps";

const defaultState:ITextFieldProps = {
    label: undefined,
    multiline: undefined,
    rows: undefined,
    disabled: undefined,
    defaultValue: undefined,
    value: undefined,
    onChange: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : ITextFieldProps {    
    switch(type) {
        case createTextField: {                                  
            return {
                ...state,
                ...payload
            };
        }

        case changeTextField: {
            return {
                ...state,
                value: payload
            };
        }

        default:
            return state;
    }
}

export default reducer;