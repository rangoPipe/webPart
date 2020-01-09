import { IDatePickerProps } from "../../redux/reducers/general/datePicker/IDatePickerProps";

export interface IDatePickerGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente DatePicker
     */
    datePicker?:IDatePickerProps;
}