import { createButton as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createButton = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createButton