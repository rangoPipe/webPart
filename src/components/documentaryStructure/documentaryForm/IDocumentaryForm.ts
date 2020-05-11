import * as React from "react";
import { TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";

export interface IDocumentaryFormState {

}

export interface IDocumentaryFormProps extends IDocumentaryFormState {
    activeView: TypeFolderEnum;
}