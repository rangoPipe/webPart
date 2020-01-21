import { hideOverlay as type } from "./_actionName";
import { IAction } from "../../../namespace";

const hideOverlay = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default hideOverlay;