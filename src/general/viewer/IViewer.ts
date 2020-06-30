import { IViewerProps as IViewer } from "../../redux/reducers/general/viewer/IViewer";

export interface IViewerState extends IViewer {
    viewer?:IViewer;
}

export interface IViewerProps extends IViewerState {
    
}