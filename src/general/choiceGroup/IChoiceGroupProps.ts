import { IChoiceGroupProps } from "../../redux/reducers/general/choiceGroup/IChoiceGroupProps";

export interface IChoiceGroupGeneralProps {

    /**
     * Nombre del namespace, con la refencia a la instancia en el store 
     */
    namespace?:string;

    /**
     * Propiedades del componente Button
     */
    choiceGroup?:IChoiceGroupProps;
}