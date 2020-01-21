import { IOverlayProps } from "../../redux/reducers/general/overlay/IOverlay";

export interface IOverlayGeneralState {
    /**
     * Propiedades del componente Overlay
     */
    overlay?:IOverlayProps;
}

export interface IOverlayGeneralProps extends IOverlayGeneralState {
    
}