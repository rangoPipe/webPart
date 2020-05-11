import { createCheck as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createCheck = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createCheck;