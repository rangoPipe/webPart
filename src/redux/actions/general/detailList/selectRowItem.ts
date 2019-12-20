import { selectRowItem as type } from "./_actionName";
import { IAction } from "../../../namespace";

const selectRowItem = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default selectRowItem;