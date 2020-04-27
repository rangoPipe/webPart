import { createDetailList as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createDetailList = (payload:object):IAction => {
    return {
      type,
      payload
    };
};

export default createDetailList;