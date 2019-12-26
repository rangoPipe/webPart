import { loadOptions as type } from "./_actionName";
import { IAction } from "../../../namespace";

const loadOptions = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default loadOptions