import { createOverlay, hideOverlay } from "../../../actions/general/overlay/_actionName";
import { IAction } from "../../../namespace";
import { IOverlayProps } from "./IOverlay";

const defaultState: IOverlayProps = {
  hidden: true,
  content: null
};

function reducer(state = defaultState, { type, payload }: IAction): IOverlayProps {
  switch (type) {
    case createOverlay: {
      return {
        ...state,
        ...payload
      };
    }
    
    case hideOverlay: {
      return {
        ...state,
        hidden: payload
      };
    }

    default:
      return state;
  }
}

export default reducer;
