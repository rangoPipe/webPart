import { createDropdown, loadOptions } from "../../../actions/general/dropdown/_actionName";
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
        case createDropdown: {
            return {
                ...state,
                ...payload
            };
        }
        case loadOptions: {
            return {
                ...state,
                options : payload
            };
        }
        default:
            return state;
    }
}

export default reducer;