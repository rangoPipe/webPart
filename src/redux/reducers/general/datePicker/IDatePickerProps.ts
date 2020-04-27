import { IDatePickerProps as IDatePickerPropsFabric, IDatePickerStrings as Fabricstrings } from "office-ui-fabric-react";

export interface IDatePickerProps extends IDatePickerPropsFabric {
    
}

export interface IDatePickerStrings extends Fabricstrings {
  placeholder:string;
}


export const languageEn:IDatePickerStrings = {
  months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],

  shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],

  shortDays: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],

  goToToday: 'Go to today',
  prevMonthAriaLabel: 'Go to previous month',
  nextMonthAriaLabel: 'Go to next month',
  prevYearAriaLabel: 'Go to previous year',
  nextYearAriaLabel: 'Go to next year',
  closeButtonAriaLabel: 'Close date picker',
  placeholder: 'Select a date...'
};

export const languageEs:IDatePickerStrings = {
  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],

  days: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],

  shortDays: ['D', 'L', 'M', 'Mi', 'J', 'V', 'S'],

  goToToday: 'Hoy',
  prevMonthAriaLabel: 'Mes anterior',
  nextMonthAriaLabel: 'Siguiente mes',
  prevYearAriaLabel: 'Año anterior',
  nextYearAriaLabel: 'Siguiente año',
  closeButtonAriaLabel: 'Cerrar',
  placeholder: 'Seleccione una fecha...'
};