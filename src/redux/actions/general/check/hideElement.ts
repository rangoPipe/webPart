import { hideElement as type } from "./_actionName";
import { IAction } from "../../../namespace";

const hideElement = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default hideElement;