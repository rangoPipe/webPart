import { createDatePicker as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createDatePicker = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default createDatePicker;