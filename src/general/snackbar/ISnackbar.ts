import { ISnackbarProps as ISnackbar } from "../../redux/reducers/general/snackbar/ISnackbar";

export interface ISnackbarState extends ISnackbar {
    snackbar:ISnackbar;
}

export interface ISnackbarProps extends ISnackbarState {
    
}