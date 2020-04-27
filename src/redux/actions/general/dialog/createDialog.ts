import { createDialog as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createDialog = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createDialog;