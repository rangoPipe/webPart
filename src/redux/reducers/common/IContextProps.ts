import { HttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContextProps {
    http? : HttpClient;
    context? : WebPartContext;
}