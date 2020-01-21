import { createTooltip as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createTooltip = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createTooltip;