import * as React from "react";
import { IDatePickerProps } from "./IDatePicker";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import 'date-fns';

export default function Page(props: IDatePickerProps) {
    const { datePicker } = props;
    const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
    return (
        (datePicker.hidden)
        ? null
        : 
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
                margin="dense"
                id= {datePicker.id}
                label={ datePicker.label }
                format= { datePicker.format }
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                    'aria-label': 'change date',
                }}
                />
        </MuiPickersUtilsProvider>
    );
}