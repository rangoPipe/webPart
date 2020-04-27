import { createTooltip } from "../../../actions/general/tooltip/_actionName";
import { IAction } from "../../../namespace";
import { ITooltipProps } from "./ITooltip";

const defaultState: ITooltipProps = {
  content: "",
  body: null
};

function reducer(state = defaultState, { type, payload }: IAction): ITooltipProps {
  switch (type) {
    case createTooltip: {
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
