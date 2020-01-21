import { ITooltipHostProps } from "office-ui-fabric-react";

export interface ITooltipProps extends ITooltipHostProps {
    body:string | object;
}