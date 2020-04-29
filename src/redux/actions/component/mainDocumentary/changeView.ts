import { changeView as type } from "./_actionName";
import { IAction } from "../../../namespace";

const changeView = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default changeView;