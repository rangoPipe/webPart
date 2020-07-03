import * as React from "react";
import { IAdminViewProps, IAdminViewState } from "./IAdminView";
import Page from "./page";
import { subspace } from "redux-subspace";
import { IStore } from "../../../redux/namespace";
import { AdminViewEnum } from "../../../common/admin/adminView/adminViewContent";
import store from "../../../redux/store";
import { connect } from "react-redux";
import { MainAppEnum } from "../../../common/mainApp/main/mainAppContent";
import { ActionNameEnum } from "../../../redux/action";
export class AdminViewClass extends React.Component<IAdminViewProps, IAdminViewState> {

    private _snackbar = subspace( (state: IStore) => state.appSnackbar, MainAppEnum.snackbar )(store);
    private _viewer = subspace( (state: IStore) => state.viewerAdminView, AdminViewEnum.viewer )(store);
    private _imageName: string; 
    constructor(props:IAdminViewProps) {
        super(props);
        this.state = {
        };

    }

    public componentWillUpdate(){
        this.updateImageName();
    }
    
    public componentWillMount() {
        this.updateImageName();
    }
    
    protected validateImage = () => {
        const image = (document.querySelector("#admin-view #admin-view-first-card img") as HTMLImageElement);
        if(!image.src) {
            throw "Seleccionar imagen";
        }
    }

    private updateImageName = () => {
        if(this._viewer.getState().items.length > 0){
            this._imageName = this._viewer.getState().items[0].name;
        }
    }

    private openImage = () => {
        try {
            this.validateImage();
            (document.querySelector("#admin-view #admin-view-first-card img") as HTMLImageElement).click();
        } catch (error) {
            this.showSnackbar(error);

            throw error;
        }
    }

    private actionImage = (action:string) => {
        try {
            this.openImage();
            setTimeout(() => (document.querySelector(action) as HTMLElement).click(), 500); 
        } catch (error) {
            this.showSnackbar(error);
        }
    }

    private showSnackbar = (message:string) => {
        this._snackbar.dispatch({ type: ActionNameEnum.createElemet, payload: { 
            show: true, 
            message, 
            severity: "warning",
            onClose: () => this._snackbar.dispatch({ type: ActionNameEnum.hideElement, payload: false })
        }});
    }

    public render() {
        return <Page actionImage={this.actionImage} openImage={this.openImage} imageName={this._imageName} />;
    }
}

    const mapStateToProps = (state: IStore) => {  
        return {
        viewer: state.viewer
        };
    };
  
const mapDispatchToProps = {};
  
export default connect(mapStateToProps, mapDispatchToProps)(AdminViewClass);