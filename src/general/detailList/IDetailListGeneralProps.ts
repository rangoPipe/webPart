import { IDetailListProps } from "../../redux/reducers/general/detailList/IDetailListProps";
import { ISelection } from "@uifabric/utilities";

export interface IDetailListGeneralProps {
    
    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente DetailList
     */
    detailList?:IDetailListProps;

    /**
     * Propiedad para controlar el evento selection
     */
    selection?:ISelection;
}