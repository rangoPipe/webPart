import { changeChecked as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeChecked = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default changeChecked;