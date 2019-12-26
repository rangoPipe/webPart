import { createButton, hideButton } from "../../../actions/general/button/_actionName";
import { IAction } from "../../../namespace";
import { IButtonProps, ButtonStyle } from "./IButtonProps";

const defaultState:IButtonProps = {
    text:"",
    split:false,
    splitButtonAriaLabel: "",
    menuProps: undefined,
    onClick: undefined,
    disabled: undefined,
    checked: false,
    hidden: false,
    buttonStyle: ButtonStyle.DefaultButton
};

function reducer(state = defaultState, { type, payload }:IAction) : IButtonProps {    
    switch(type) {
        case createButton: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case hideButton: {                                  
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