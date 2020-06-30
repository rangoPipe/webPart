import { MainAppViewEnum } from "../../../common/mainApp/main/mainAppContent";

export interface IMainState {
    key?:string;
    actualView:MainAppViewEnum | undefined;
}

export interface IMainProps extends IMainState {
}