import { createTreeView } from "../../../actions/general/treeView/_actionName";
import { IAction } from "../../../namespace";
import { ITreeViewProps } from "./ITreeView";

const defaultState:ITreeViewProps = {
         
};

function reducer(state = defaultState, { type, payload }:IAction) : ITreeViewProps {    
    switch(type) {
        case createTreeView: {                                  
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