import { IAction, ActionNameEnum } from "../../../action";
import { IControlProps } from "./IControl";

const defaultState:IControlProps = {
    type:"text",
    label: null,
    hidden: false,
    value: undefined,
};

function reducer(state = defaultState, { type, payload }:IAction) : IControlProps {    
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