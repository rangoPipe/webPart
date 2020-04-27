import { IButtonProps as IButtonPropsFabric } from "office-ui-fabric-react";

export interface IButtonProps extends IButtonPropsFabric {
    buttonStyle:ButtonStyle;
}


export enum ButtonStyle {
    DefaultButton,
    PrimaryButton,
    IconButton,
    ActionButton
}