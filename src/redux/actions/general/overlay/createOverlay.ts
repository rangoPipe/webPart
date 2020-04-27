import { createOverlay as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createOverlay = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createOverlay;