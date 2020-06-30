export interface IAdminListState {
    key?:string;
    allSelected?:boolean;
}

export interface IAdminListProps extends IAdminListState {
    onClickSelectAll?: (v:boolean) => void;
}