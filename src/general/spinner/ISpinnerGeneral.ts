import { ISpinnerProps } from "../../redux/reducers/general/spinner/ISpinner";

export interface ISpinnerGeneralState {
    /**
     * Propiedades del componente Spinner
     */
    spinner?:ISpinnerProps;
}

export interface ISpinnerGeneralProps extends ISpinnerGeneralState {
    
}