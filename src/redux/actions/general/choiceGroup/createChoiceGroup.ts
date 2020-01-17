import { createChoiceGroup as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createChoiceGroup = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createChoiceGroup;