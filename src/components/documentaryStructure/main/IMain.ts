import { IMainDocumentary } from "../../../redux/reducers/component/documentaryStructure/mainDocumentary/IMainDocumentary";

export interface IMainState extends IMainDocumentary {
    key?:string;
}

export interface IMainProps extends IMainState {
}