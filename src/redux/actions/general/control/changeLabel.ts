import { changeLabel as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeLabel = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default changeLabel;