import { ICheckboxProps } from "../../redux/reducers/general/checkbox/ICheckboxProps";

export interface ICheckboxGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Checkbox
     */
    checkbox?:ICheckboxProps;
}