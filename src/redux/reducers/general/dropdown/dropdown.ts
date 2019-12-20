import { createButton } from "../../../actions/general/button/_actionName";
import { IAction } from "../../../namespace";
import { IDropdownProps } from "./IDropdownProps";

const defaultState:IDropdownProps = {
    options:[],
    placeHolder : "",
    onChange: (e) => {
        
    }
};

function reducer(state = defaultState, { type, payload }:IAction) : IDropdownProps {    
    switch(type) {
        case createButton: {                                  
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