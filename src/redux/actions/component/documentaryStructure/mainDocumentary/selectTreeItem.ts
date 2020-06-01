import { selectTreeItem as type } from "./_actionName";
import { IAction } from "../../../../namespace";

const selectTreeItem = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default selectTreeItem;