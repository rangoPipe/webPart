import { onChange as type } from "./_actionName";
import { IAction } from "../../../namespace";

const onChange = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default onChange;