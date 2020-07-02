import { IAction, ActionNameEnum } from "../../../action";
import { ISnackbarProps } from "./ISnackbar";

const defaultState:ISnackbarProps = {
    duration: 3000,
    hidden: true,
};

function reducer(state = defaultState, { type, payload }:IAction) : ISnackbarProps {    
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