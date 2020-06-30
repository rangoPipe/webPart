import { IAction, ActionNameEnum } from "../../action";
import { IContextProps } from "./IContext";

const defaultState:IContextProps = {
    spfxContext: null,
    properties: null
};

function reducer(state = defaultState, { type, payload }:IAction) : IContextProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return payload;
        }
        
        default:
            return state;
    }
}

export default reducer;