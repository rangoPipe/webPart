import { createState as type } from "./_actionName";
import { IAction } from "../../../../namespace";

const createState = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createState;