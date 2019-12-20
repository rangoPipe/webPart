import { IDropdownProps } from "../../redux/reducers/general/dropdown/IDropdownProps";

export interface IDropdownGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Button
     */
    dropdown?:IDropdownProps;
}