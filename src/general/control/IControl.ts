import { IControlProps as IControl } from "../../redux/reducers/general/control/IControl";

export interface IControlState extends IControl {
    control:IControl;
}

export interface IControlProps extends IControlState {
    
}