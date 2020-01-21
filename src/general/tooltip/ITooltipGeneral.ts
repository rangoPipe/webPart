import { ITooltipProps } from "../../redux/reducers/general/tooltip/ITooltip";

export interface ITooltipGeneralState {
    /**
     * Propiedades del componente Tooltip
     */
    tooltip?:ITooltipProps;
}

export interface ITooltipGeneralProps extends ITooltipGeneralState {
    
}