import { IOverlayProps as overlayFabric } from "office-ui-fabric-react";

export interface IOverlayProps extends overlayFabric {
    content?:string | object;
}