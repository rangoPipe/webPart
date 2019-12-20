import { createContext as type } from "./_actionName";
import { IAction } from "../../namespace";

const createContext = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createContext;