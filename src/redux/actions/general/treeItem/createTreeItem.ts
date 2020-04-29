import { createTreeItem as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createTreeItem = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createTreeItem;