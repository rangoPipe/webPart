import { createButton, hideButton, changeText, onClick } from "../../../actions/general/button/_actionName";
import { IAction } from "../../../namespace";
import { IButtonProps } from "./IButton";

const defaultState:IButtonProps = {
    text: undefined,
    variant: "primary",
    type: "button",
    size: "sm",
    onClick: undefined,
    disabled: undefined,
    hidden: false,
    className: undefined
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
        case changeText: {                                  
            return {
                ...state,
                text : payload
            };
        }
        case onClick: {                                  
            return {
                ...state,
                onClick : payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;