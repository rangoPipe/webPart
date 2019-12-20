import { createButton } from "../../../actions/general/button/_actionName";
import { IAction } from "../../../namespace";
import { IButtonProps } from "./IButtonProps";

const defaultState:IButtonProps = {
    text:"",
    split:false,
    splitButtonAriaLabel: "",
    menuProps: undefined,
    onClick: undefined,
    disabled: undefined,
    checked: false,
};

function reducer(state = defaultState, { type, payload }:IAction) : IButtonProps {    
    switch(type) {
        case createButton: {                                  
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