import { ITextFieldProps } from "../../redux/reducers/general/textField/ITextFieldProps";

export interface ITextFieldGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Textfield
     */
    textField?:ITextFieldProps;

    /**
     * Valor asignable del TextField
     */
    value?:string;
}