import { createSelect as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createSelect = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createSelect;