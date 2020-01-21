import { createSpinner as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createSpinner = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createSpinner;