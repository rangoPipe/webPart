export interface IMainState {
    key?: string;
    title?: string;
    menu?: string;
}
export interface IMainProps extends IMainState {
    onClickMenu?: any;
    getComponent?: any;
}