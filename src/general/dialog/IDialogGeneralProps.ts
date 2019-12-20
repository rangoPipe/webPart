import { IDialogProps } from "../../redux/reducers/general/dialog/IDialogProps";

export interface IDialogGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Dialog
     */
    dialog?:IDialogProps;
}