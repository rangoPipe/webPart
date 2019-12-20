import { IDialogProps as IDialogPropsFabric  } from "office-ui-fabric-react";

export interface IDialogProps extends IDialogPropsFabric {
    /**
     * Si el dialogo esta oculto
     */
    hideDialog: boolean;

    /**
     * Almacena el contenido del body para el dialogo
     */
    body: any;

    /**
     * Almacena el contenido del footer para el dialogo
     */
    footer: any;
}