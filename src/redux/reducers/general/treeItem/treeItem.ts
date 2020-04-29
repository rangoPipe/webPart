import { createTreeItem } from "../../../actions/general/treeItem/_actionName";
import { IAction } from "../../../namespace";
import { ITreeItemProps } from "./ITreeItem";

const defaultState:ITreeItemProps = {
    nodeId: undefined         
};

function reducer(state = defaultState, { type, payload }:IAction) : ITreeItemProps {    
    switch(type) {
        case createTreeItem: {                                  
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