import { IDetailListProps } from "../../../../../redux/reducers/general/detailList/IDetailListProps";
import { ICommandBarProps } from "../../../../../redux/reducers/general/commandBar/ICommandBarProps";

export interface IOwnerMenuProps {
    detailList?:IDetailListProps;
    commandBar?:ICommandBarProps;
}