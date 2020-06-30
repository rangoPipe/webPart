import { IAction, ActionNameEnum } from "../../../action";
import { ICardProps } from "./ICard";

const defaultState:ICardProps = {
    contentBody: undefined,
    contentHeader: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : ICardProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
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