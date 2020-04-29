import * as React from "react";
import { viewDocumentary } from "../../../common/documentary/main/mainDocumentaryEnum";

export interface IDocumentaryFormState {

}

export interface IDocumentaryFormProps extends IDocumentaryFormState {
    activeView: viewDocumentary;
    onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}