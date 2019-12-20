import { IButtonProps } from "../../redux/reducers/general/button/IButtonProps";

export interface IButtonGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Button
     */
    button?:IButtonProps;
}