import { IAction, ActionNameEnum } from "../../../action";
import { ISelectProps } from "./ISelect";

const defaultState:ISelectProps = {
    id: null,
    label: undefined,
    onChange: undefined,
    disabled: false,
    hidden: false,
    className: undefined,
    items: [],
    value: undefined,
    multiple: false,
    disableCloseOnSelect: false,
};

function reducer(state = defaultState, { type, payload }:IAction) : ISelectProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.loadItems: {                                  
            return {
                ...state,
                items : payload
            };
        }
        case ActionNameEnum.onChange: {                                  
            return {
                ...state,
                onChange : payload
            };
        }
        case ActionNameEnum.hideElement: {                                  
            return {
                ...state,
                hidden : payload
            };
        }
        case ActionNameEnum.changeValue: {                                  
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