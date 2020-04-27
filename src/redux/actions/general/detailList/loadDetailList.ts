import { loadDetailList as type } from "./_actionName";
import { IAction } from "../../../namespace";

const loadDetailList = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default loadDetailList;