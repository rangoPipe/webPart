import { IGridProps as IGrid } from "../../redux/reducers/general/grid/IGrid";

export interface IGridState extends IGrid {
    grid?:IGrid;
}

export interface IGridProps extends IGridState {
    onChange?: (page:number) => void;
}