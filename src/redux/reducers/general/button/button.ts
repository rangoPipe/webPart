import { IAction, ActionNameEnum } from "../../../action";
import { IButtonProps } from "./IButton";

const defaultState:IButtonProps = {
    text: undefined,
    onClick: undefined,
    disabled: false,
    hidden: false,
    className: undefined,
    variant: "contained",
    color: "default"
};

function reducer(state = defaultState, { type, payload }:IAction) : IButtonProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.hideElement: {                                  
            return {
                ...state,
                hidden : payload
            };
        }
        case ActionNameEnum.changeText: {                                  
            return {
                ...state,
                text : payload
            };
        }
        case ActionNameEnum.onClick: {                                  
            return {
                ...state,
                onClick : payload
            };
        }
        case ActionNameEnum.disableElement: {                                  
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