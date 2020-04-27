import {
  showDialog,
  hideDialog,
  createDialog
} from "../../../actions/general/dialog/_actionName";
import { DialogType } from "office-ui-fabric-react";
import { IAction } from "../../../namespace";
import { IDialogProps } from "./IDialogProps";

const defaultState: IDialogProps = {
  hideDialog: true,
  type: DialogType.largeHeader,
  title: "Missing Subject",
  subText: "Do you want to send this message without a subject?",
  body: undefined,
  footer: undefined
};

function reducer(state = defaultState, { type, payload }: IAction): IDialogProps {
  switch (type) {
    case showDialog: {
      return {
        ...state,
        hideDialog: payload
      };
    }
    case hideDialog: {
      return {
        ...state,
        hideDialog: payload
      };
    }
    case createDialog: {
      return {
        ...state,
        ...payload
      };
    }

    default:
      return state;
  }
}

export default reducer;
