import { IMainDocumentary } from "../../../redux/reducers/component/mainDocumentary/IMainDocumentary";

export interface IMainState extends IMainDocumentary {
}

export interface IMainProps extends IMainState {
    onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}