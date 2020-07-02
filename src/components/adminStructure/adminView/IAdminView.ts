export interface IAdminViewState {
    key?:string;
}

export interface IAdminViewProps extends IAdminViewState {
    imageName?: string;
    openImage?: () => void;
    actionImage?: (action: string) => void;
}