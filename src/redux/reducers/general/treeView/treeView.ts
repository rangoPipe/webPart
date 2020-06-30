import { IAction, ActionNameEnum } from "../../../action";
import { ITreeViewProps } from "./ITreeView";

const defaultState:ITreeViewProps = {
         
};

function reducer(state = defaultState, { type, payload }:IAction) : ITreeViewProps {    
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