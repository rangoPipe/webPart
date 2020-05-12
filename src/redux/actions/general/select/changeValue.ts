import { changeValue as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeValue = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default changeValue;