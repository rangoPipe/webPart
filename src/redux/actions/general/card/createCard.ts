import { createCard as type } from "./_actionName";
import { IAction } from "../../../namespace";

const createCard = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default createCard;