import { hideButton as type } from "./_actionName";
import { IAction } from "../../../namespace";

const hideButton = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default hideButton;