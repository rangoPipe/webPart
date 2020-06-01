import { TypeFolderEnum, IDocumentary } from "../../../../../common/documentary/documentaryTree/documentaryTreeEnum";

export interface IMainDocumentary {
    activeView?: TypeFolderEnum;
    parent?: string | number;
    itemSelected?: TypeFolderEnum;
    onChangeView?: (type:TypeFolderEnum, item?:IDocumentary) => void;
}

