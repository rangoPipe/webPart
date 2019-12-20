import { hideDialog as type } from "./_actionName";
import { IAction } from "../../../namespace";

const hideDialog = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default hideDialog;