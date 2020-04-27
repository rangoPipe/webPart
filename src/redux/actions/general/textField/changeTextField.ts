import { changeTextField as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeTextField = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default changeTextField;