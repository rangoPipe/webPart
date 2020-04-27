import { createDatePicker, changeValue } from "../../../actions/general/datePicker/_actionName";
import { IAction } from "../../../namespace";
import { IDatePickerProps, languageEs } from "./IDatePickerProps";
import { DayOfWeek } from "office-ui-fabric-react";

const defaultState: IDatePickerProps = {
  firstDayOfWeek :  DayOfWeek.Monday,
  strings : languageEs,
  placeholder: languageEs.placeholder,
  onSelectDate: () => {},
  label: "",
  formatDate:undefined,
  value: undefined
};

function reducer(state = defaultState, { type, payload }: IAction): IDatePickerProps {
  switch (type) {
    case createDatePicker: {
      return {
        ...state,
        ...payload
      };
    }
    case changeValue: {
      return {
        ...state,
        value: payload
      };
    }

    default:
      return state;
  }
}

export default reducer;
