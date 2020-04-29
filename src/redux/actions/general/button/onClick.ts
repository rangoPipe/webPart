import { onClick as type } from "./_actionName";
import { IAction } from "../../../namespace";

const onClick = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default onClick;