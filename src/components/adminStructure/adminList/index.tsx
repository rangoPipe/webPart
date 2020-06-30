import * as React from "react";
import { subspace } from "redux-subspace";
import { IFileInfo } from "@pnp/sp/files";
import Tiff from "tiff.js";
import { IAdminListProps, IAdminListState } from "./IAdminList";
import Page from "./page";

import DocumentLibraryService from "../../../service/sharepoint/DocumentLibraryService";
import { IStore } from "../../../redux/namespace";
import { MainAppEnum } from "../../../common/mainApp/main/mainAppContent";
import store from "../../../redux/store";

import { AdminListEnum } from "../../../common/admin/adminList/adminListContent";
import { ActionNameEnum } from "../../../redux/action";
import { IGridItem } from "../../../redux/reducers/general/grid/IGrid";
import { AdminViewEnum } from "../../../common/admin/adminView/adminViewContent";
import { IViewerItem } from "../../../redux/reducers/general/viewer/IViewer";

export default class MainClass extends React.Component<IAdminListProps, IAdminListState> {
    
    private _appContext = subspace( (state: IStore) => state.appContext, MainAppEnum.context )(store);
    private _gridController = subspace( (state: IStore) => state.gridListAdmin, AdminListEnum.grid )(store);
    private _viewerController = subspace( (state: IStore) => state.viewerAdminView, AdminViewEnum.viewer )(store);
    
    constructor(props:IAdminListProps) {
        super(props);

        this.state = {
            allSelected: false,
        };

        this.loadFileds();
        
    }

    private loadFileds = async() => {
        try {
            const service = new DocumentLibraryService();
            /*const images = await service.getFilesAsync(this._appContext.getState().properties.siteName, this._appContext.getState().properties.inbox);
            let items = await this.createImages(images);
            
            this._gridController.dispatch({type: ActionNameEnum.createElemet, payload: { items } });*/
            
        } catch (error) {
            console.log(error);
        }      
    }

    public createImages = async (items: IFileInfo[]):Promise<IGridItem[]> => {
        const service = new DocumentLibraryService();
        return Promise.all(
            items.map(async (x) => {
                const buffer = await service.getBufferFileAsync(x);
                const base64 = this.toBase64(buffer);
                return {
                    id: x.UniqueId,
                    name: x.Name,
                    path: x.ServerRelativeUrl,
                    base64: base64,
                    buffer,
                    label: "Seleccionar",
                    onClick: (e) => this.selectImage(base64),
                    onSelect: (e) => this.selectItem(x.UniqueId)                  
                };
            })
        );
    }

    public selectItem = (id:string) => {
        const items = this._gridController.getState().items;
        items.forEach(x => {
            if(x.id == id){
                x.selected = !x.selected;
            }
        });
        this._gridController.dispatch({type: ActionNameEnum.changeValue, payload: items });

    }

    private changeAllSelect = (allSelected:boolean) => {
        const items = this._gridController.getState().items;
        items.forEach(x => x.selected = allSelected );
        this._gridController.dispatch({type: ActionNameEnum.changeValue, payload: items });

        this.setState({ ...this.state, allSelected });
        
    }

    public toBase64 = (buffer:ArrayBuffer) => {
        var image = new Tiff({ buffer });
        var canvas:HTMLCanvasElement = image.toCanvas();
        return canvas.toDataURL();
    }

    private selectImage = (path:string) => {
        let images:IViewerItem[] = [{ src:path }];
        this._viewerController.dispatch({type: ActionNameEnum.createElemet, payload: { path, items: images } });
    }

    public render() {
        return <Page 
            allSelected={ this.state.allSelected } 
        />;
    }
}