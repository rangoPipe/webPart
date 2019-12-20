import { createContext } from "../../actions/common/_actionName";
import { IContextProps } from "./IContextProps";
import { IAction } from "../../namespace";

const defaultState:IContextProps = {
    http: undefined,
    context: undefined
};

export default function reducer(state = defaultState, { type, payload }:IAction):IContextProps {    
    switch(type) {
        case createContext: {
            return {
                ...state,
                ...payload
            };
        }
        default:
            return state;
    }
}
