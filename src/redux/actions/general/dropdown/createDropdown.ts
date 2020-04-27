import { createDropdown as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createDropdown = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createDropdown;