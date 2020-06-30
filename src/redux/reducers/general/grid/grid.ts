import { IAction, ActionNameEnum } from "../../../action";
import { IGridProps } from "./IGrid";

const defaultState:IGridProps = {
    items: [],
    hidden: false,
};

function reducer(state = defaultState, { type, payload }:IAction) : IGridProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.changeValue: {                                  
            return {
                ...state,
                items: payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;