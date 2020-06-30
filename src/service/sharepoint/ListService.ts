import { sp } from "@pnp/sp";
import "@pnp/sp/fields";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { IItemUpdateResult, IItemAddResult } from "@pnp/sp/items";


export default class ListService {
    constructor() {
        
    }

    public saveListSPAsync = (type:string, body:any):Promise<IItemAddResult | IItemUpdateResult> => {
        return (body.ID)
            ? sp.web.lists.getByTitle(type).items.getById(body.ID).update(body)
            : sp.web.lists.getByTitle(type).items.add(body);        
    }

    public getListSPAsync = async (title:string, select:string[] = ["*"], expand:string[] = []): Promise<any[]> => {
        return await sp.web.lists.getByTitle(title).items.select(...select).expand(...expand).getAll();
    }
}