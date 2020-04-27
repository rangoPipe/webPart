import { changeConnection as type } from "./_actionName";
import { IAction } from "../../namespace";

const changeConnection = (payload:any):IAction => {
    return {
      type,
      payload
    };
};

export default changeConnection;