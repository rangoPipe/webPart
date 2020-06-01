import { onChangeView as type } from "./_actionName";
import { IAction } from "../../../../namespace";

const onChangeView = (payload:string):IAction => {
    return {
      type,
      payload
    };
};

export default onChangeView;