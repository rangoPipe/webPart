import { IAction, ActionNameEnum } from "../../../action";
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
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }

        case ActionNameEnum.hideElement: {                                  
            return {
                ...state,
                hidden: payload
            };
        }
        case ActionNameEnum.onChange: {
            return {
                ...state,
                onChange: payload
            };
        }
        case ActionNameEnum.changeValue: {                                  
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