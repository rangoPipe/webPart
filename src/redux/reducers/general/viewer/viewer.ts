import { IAction, ActionNameEnum } from "../../../action";
import { IViewerProps } from "./IViewer";

const defaultState:IViewerProps = {
    items: [],
    className: [ "img-fluid" ]
};

function reducer(state = defaultState, { type, payload }:IAction) : IViewerProps {    
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