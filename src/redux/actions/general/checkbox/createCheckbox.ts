import { createCheckbox as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createCheckbox = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createCheckbox;