import { createTreeView as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createTreeView = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createTreeView;