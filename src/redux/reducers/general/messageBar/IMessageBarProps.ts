import { IMessageBarProps as IMessageBarPropsFabric } from "office-ui-fabric-react";

export interface IMessageBarProps extends IMessageBarPropsFabric {
    /**
     * Almacena el cotenido del messageBar
     */
    value: any; 
    
    /**
     * Si el dialogo esta oculto
     */
    hideMessage: boolean;
}