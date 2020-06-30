import { ICheckProps } from "./reducers/general/check/ICheck";
import { IButtonProps } from "./reducers/general/button/IButton";
import { IControlProps } from "./reducers/general/control/IControl";
import { ITextFieldProps } from "./reducers/general/textField/ITextField";
import { ISelectProps } from "./reducers/general/select/ISelect";


export interface IAction {
    /**
     * Almacena el nombre de la accion
     */
    type:ActionNameEnum;

    /**
     * Suministra el valor a tratar por el reducer
     */
    payload?:any;
}

export enum ActionNameEnum {

    //General
    createElemet = "createElemet",
    hideElement = "hideElement",
    disableElement = "disableElement",
    onClick = "onClick",
    onChange = "onChange",
    changeValue = "changeValue",
    changeText = "changeText",
    changeLabel = "changeLabel",

    //mainDocumentary
    changeView = "changeView",
    selectTreeItem = "selectTreeItem",
    onChangeView = "onChangeView",

    //documentaryTree
    loadItems = "loadItems",

    changeConnection = "changeConnection",
    
}

export function createCheckElement(payload:ICheckProps){
    return { type: ActionNameEnum.createElemet, payload };
}

export function createButtonElement(payload:IButtonProps){
    return { type: ActionNameEnum.createElemet, payload };
}

export function createControlElement(payload:IControlProps){
    return { type: ActionNameEnum.createElemet, payload };
}

export function createTextFieldElement(payload:ITextFieldProps){
    return { type: ActionNameEnum.createElemet, payload };
}

export function createSelectElement(payload:ISelectProps){
    return { type: ActionNameEnum.createElemet, payload };
}