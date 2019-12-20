import { IMessageBarProps } from "../../redux/reducers/general/messageBar/IMessageBarProps";

export interface IMessageBarGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente MessageBar
     */
    messageBar?:IMessageBarProps;
}