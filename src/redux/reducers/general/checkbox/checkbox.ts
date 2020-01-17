import { createCheckbox, changeLabel } from "../../../actions/general/checkbox/_actionName";
import { IAction } from "../../../namespace";
import { ICheckboxProps } from "./ICheckboxProps";

const defaultState: ICheckboxProps = {
  label: "",
  onChange: undefined,
  disabled: false,
  defaultChecked:false,
  checked:undefined
};

function reducer(state = defaultState, { type, payload }: IAction): ICheckboxProps {
  switch (type) {
    case createCheckbox: {
      return {
        ...state,
        ...payload
      };
    }
    case changeLabel: {
      return {
        ...state,
        label: payload
      };
    }

    default:
      return state;
  }
}

export default reducer;
