import * as React from "react";
import { DatePicker } from "office-ui-fabric-react";
import { IDatePickerGeneralProps } from "./IDatePickerGeneralProps";

/**
 * Retorna el HTML del componente DatePicker
 * @param {IDatePickerGeneralProps} props Atributos del componente DatePicker
 */
function Page(props: IDatePickerGeneralProps) {
  const { datePicker } = props;
  return (
    <DatePicker
        firstDayOfWeek = { datePicker.firstDayOfWeek }
        strings = { datePicker.strings }
        placeholder = { datePicker.placeholder }
        label = { datePicker.label }
        formatDate = { datePicker.formatDate }
    />
  );
}

export default Page;
