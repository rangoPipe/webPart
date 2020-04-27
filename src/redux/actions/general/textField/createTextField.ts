import { createTextField as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createTextField = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createTextField;