import { IAction, ActionNameEnum } from "../../../action";
import { ISnackbarProps } from "./ISnackbar";

const defaultState:ISnackbarProps = {
    duration: 3000,
    show: false,
    position: { vertical:'top', horizontal:'right' },
};

function reducer(state = defaultState, { type, payload }:IAction) : ISnackbarProps {    
    switch(type) {
        case ActionNameEnum.createElemet: {                                  
            return {
                ...state,
                ...payload
            };
        }
        case ActionNameEnum.hideElement: {                                  
            return {
                ...state,
                show: payload
            };
        }
        
        default:
            return state;
    }
}

export default reducer;