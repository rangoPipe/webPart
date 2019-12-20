import { createMessageBar as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createMessageBar = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createMessageBar;