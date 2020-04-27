import { createSpinner } from "../../../actions/general/spinner/_actionName";
import { IAction } from "../../../namespace";
import { ISpinnerProps } from "./ISpinner";

const defaultState: ISpinnerProps = {
  label: "Cargando..."
};

function reducer(state = defaultState, { type, payload }: IAction): ISpinnerProps {
  switch (type) {
    case createSpinner: {
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
