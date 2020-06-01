import { createButton, hideButton, changeText, onClick, disableItem } from "../../../actions/general/button/_actionName";
import { IAction } from "../../../namespace";
import { IButtonProps } from "./IButton";

const defaultState:IButtonProps = {
    text: undefined,
    variant: "primary",
    type: "button",
    size: "sm",
    onClick: undefined,
    disabled: false,
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
        case disableItem: {                                  
            return {
                ...state,
                disabled : payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;