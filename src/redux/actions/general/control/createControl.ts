import { createControl as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createControl = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createControl;