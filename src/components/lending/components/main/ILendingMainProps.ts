export interface ILendingMainState {
    key?: string;
    title?: string;
    menu?: string;
}
export interface ILendingMainProps extends ILendingMainState {
    onClickMenu?: any;
}