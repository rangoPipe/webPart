import { IModalProps } from "../../redux/reducers/general/modal/IModalProps";

export interface IModalGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Modal
     */
    modal?:IModalProps;
}