import { IAction, ActionNameEnum } from "../../../action";
import { IDatePickerProps } from "./IDatePicker";

const defaultState:IDatePickerProps = {
    id: null,
    label: null,
    format: "dd/MM/yyyy"
};

function reducer(state = defaultState, { type, payload }:IAction) : IDatePickerProps {    
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
        
        default:
            return state;
    }
}

export default reducer;