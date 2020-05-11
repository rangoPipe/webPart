import { loadItems as type } from "./_actionName";
import { IAction } from "../../../namespace";

const loadItems = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default loadItems;