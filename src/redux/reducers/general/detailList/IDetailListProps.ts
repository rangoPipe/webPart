import { IDetailsListProps as IDetailsListPropsFabric, IShimmeredDetailsListProps } from "office-ui-fabric-react";

export interface IDetailListProps extends  IShimmeredDetailsListProps {
    /**
     * Lleva registro de los items seleccionados
     */
    selectedItems: any[];
}