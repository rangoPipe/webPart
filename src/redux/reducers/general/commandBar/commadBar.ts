import { createCommandBar } from "../../../actions/general/commandBar/_actionName";
import { ICommandBarProps } from "./ICommandBarProps";
import { IAction } from "../../../namespace";

const defaultState:ICommandBarProps = {
    items: [],
    farItems:[]
};

function reducer(state = defaultState, { type, payload }:IAction):ICommandBarProps {
    switch(type) {
        case createCommandBar: {
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