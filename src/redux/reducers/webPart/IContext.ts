import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ISPFXContext } from "@pnp/common";

export interface IContextProps {
    spfxContext?: ISPFXContext;
    properties?: any;
}