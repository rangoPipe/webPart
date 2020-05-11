import { hideControl as type } from "./_actionName";
import { IAction } from "../../../namespace";

const hideControl = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default hideControl;