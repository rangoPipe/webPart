import { createCard } from "../../../actions/general/card/_actionName";
import { IAction } from "../../../namespace";
import { ICardProps } from "./ICard";

const defaultState:ICardProps = {
    contentBody: undefined,
    contentHeader: undefined
};

function reducer(state = defaultState, { type, payload }:IAction) : ICardProps {    
    switch(type) {
        case createCard: {                                  
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