import { changeText as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeText = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default changeText;