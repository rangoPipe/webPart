import { TypeFolderEnum } from "../../../common/documentary/documentaryForm/documentaryFormEnum";
import { IDocumentary } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

export interface IDocumentaryTreeState {
    fondo?: any[];
    seccion?: any[];
    subseccion?: any[];
    serie?: any[];
    subserie?: any[];
}

export interface IDocumentaryTreeProps extends IDocumentaryTreeState {
    onClickItem?: () => void;
    onSelectTreeItem?: (item: IDocumentary, itemSelected: TypeFolderEnum, parentId?:string) => void;
}