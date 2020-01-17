import { createModal as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createModal = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createModal;