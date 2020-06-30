import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/files";
import "@pnp/sp/folders";
import "@pnp/sp/security";
import { IFileAddResult, IFileInfo } from "@pnp/sp/files";
import { IItemUpdateResult } from "@pnp/sp/items";

export default class DocumentLibraryService {
    constructor() {
        
    }

    public createFileAsync = async (fileName:string, file:File | Blob, site:string, documentType:string): Promise<IFileAddResult> => {
        try {
            let path:string = `/sites/${site}/${documentType}`;            
            if (file.size <= 10485760) {
                return await sp.web.getFolderByServerRelativePath(path).files.add(fileName, file, true);

            }else {
                return await sp.web.getFolderByServerRelativeUrl(path).files.addChunked(fileName, file, data => {
    
                    //Logger.log({ data: data, level: LogLevel.Verbose, message: "progress" });
    
                }, true);
                
            }
        } catch (error) {
            throw error;
        }
    }

    public updateFieldsFileAsync = async (file:IFileAddResult, body:object): Promise<IItemUpdateResult> => {
        try {
            const item = await file.file.getItem();            
            return await item.update(body);

        } catch (error) {
            console.log(error);
        }
    }

    public getFilesAsync = async(site:string,documentType:string) => {
        let path:string = `/sites/${site}/${documentType}`;
        return await sp.web.getFolderByServerRelativePath(path).files.expand('ListItemAllFields').get();
    }

    public getBufferFileAsync = async(item:IFileInfo) => {
        return await sp.web.getFileByServerRelativeUrl(item.ServerRelativeUrl).getBuffer();
    }
}