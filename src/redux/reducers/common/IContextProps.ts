import { HttpClient } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IContextProps {
    http? : HttpClient;
    context? : WebPartContext;
    connectionString?: string;
    resourceEndPointApi?: string;
    appTitle?: string;
    iconLoader?: string;
    identifier?: string;
    stylesheet?: string;
    headerImage?: string;
}