import { createContext, changeConnection } from "../../actions/common/_actionName";
import { IContextProps } from "./IContextProps";
import { IAction } from "../../namespace";

const defaultState:IContextProps = {
    http: undefined,
    context: undefined,
    connectionString: "",
    resourceEndPointApi: "",
    appTitle: "",
    iconLoader: "",
    identifier: "",
    stylesheet: "",
    headerImage: ""
};

export default function reducer(state = defaultState, { type, payload }:IAction):IContextProps {    
    switch(type) {
        case createContext: {
            return {
                ...state,
                ...payload
            };
        }
        case changeConnection: {
            return {
                ...state,
                ...payload
            };
        }
        default:
            return state;
    }
}
