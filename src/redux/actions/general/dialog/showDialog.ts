import { showDialog as type } from "./_actionName";
import { IAction } from "../../../namespace";

const showDialog = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default showDialog;