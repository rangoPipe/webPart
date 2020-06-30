import { sp } from "@pnp/sp";
import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/content-types";
import { ISelectItemProps } from "../../redux/reducers/general/select/ISelect";
import { IActionResult } from "../../common/mainApp/main/mainAppContent";
import { IContentType } from "@pnp/sp/content-types";


export default class ContentTypeService {
    constructor() {
        
    }

    public getAllContentTypeAsync = async () => {
        const contentTypes =  await sp.web.contentTypes.filter("Group eq 'HACEB'").orderBy('Name',true)();
        return contentTypes.map(x => {
            return {
                text: x.Name,
                value: x.StringId,
                key: x.StringId
            };
        });
    }

    public getAllColumnsAsync = async () => {
        const subject = await sp.web.fields.getByInternalNameOrTitle("Subject").select("Id,Title,InternalName")();
        const location = await sp.web.fields.getByInternalNameOrTitle("Location").select("Id,Title,InternalName")();
        const columns = await sp.web.fields.select("Id,Title,InternalName").filter("Group eq 'HACEB'").orderBy('Title',true)();
        
        columns.push(subject,location);
        columns.sort((a,b) =>  a.Title.localeCompare(b.Title));
        let items:ISelectItemProps[] = columns.map(x => {
            return {
                text: x.Title,
                value: x.InternalName,
                key: x.Id
            };
        });

        return items;
    }

    public saveDocumentalTypeAsync = async (uri:string, body:string) =>
    {
        const headers = new Headers();
        headers.append("Content-Type", "application/json");
        
        const response = await fetch(uri, {
            headers,
            method: 'POST',
            body
        });
        return await response.json(); 
    }

    public getAllFieldsByContentTypeAsync = async (id:string) => {
        return (await sp.web.contentTypes.getById(id).fields()).filter(x => x.Group == "HACEB");      
    }
}