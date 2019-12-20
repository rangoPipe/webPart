import { ICommandBarProps } from "../../redux/reducers/general/commandBar/ICommandBarProps";

export interface ICommandBarGeneralProps {

     /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente CommandBar
     */
    commandBar?:ICommandBarProps;
}