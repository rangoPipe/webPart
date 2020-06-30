import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IStore } from "../../../redux/namespace";
import { ActionNameEnum } from "../../../redux/action";
import store from "../../../redux/store";
import Page from "./page";

import { IDocumentaryTreeProps, IDocumentaryTreeState } from "./IDocumentaryTree";
import { DocumentaryTreeEnum, TypeFolderEnum, IDocumentary } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import ListService from "../../../service/sharepoint/ListService";


export class DocumentaryTreeClass extends React.Component<IDocumentaryTreeProps,IDocumentaryTreeState> {

    private _mainController = subspace ( (state: IStore) => state.stateMainDocumentary, MainDocumentaryEnum.state )(store);
    private _stateController = subspace ( (state: IStore) => state.stateDocumentaryTree, DocumentaryTreeEnum.state )(store);
    private _fondoController = subspace( (state: IStore) => state.btnFondoDocumentary, DocumentaryTreeEnum.btnFondo )(store);
    private _seccionController = subspace( (state: IStore) => state.btnSeccionDocumentary, DocumentaryTreeEnum.btnSeccion )(store);
    private _subseccionController = subspace( (state: IStore) => state.btnSubseccionDocumentary, DocumentaryTreeEnum.btnSubseccion )(store);
    private _serieController = subspace( (state: IStore) => state.btnSerieDocumentary, DocumentaryTreeEnum.btnSerie )(store);
    private _subserieController = subspace( (state: IStore) => state.btnSubserieDocumentary, DocumentaryTreeEnum.btnSubserie )(store);
    private _tipodocumentalController = subspace( (state: IStore) => state.btnTipoDocumentary, DocumentaryTreeEnum.btnTipo )(store);
    
    constructor(props:IDocumentaryTreeProps){
        super(props);

        this.state = {
            fondo: [],
            seccion: [],
            subseccion: [],
            serie: [],
            subserie: []
        };
        
        this._stateController.dispatch({type: ActionNameEnum.loadItems, payload: this.loadData});
        
        this._fondoController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Fondo</div>,
                variant: "outline-light",
                size: "lg",
                disabled: false,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Fondo)
            }
        });

        this._seccionController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Sección</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Seccion)
            }
        });

        this._subseccionController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subsección</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Subseccion),
            }
        });

        this._serieController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Serie</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Serie),
            }
        });

        this._subserieController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subserie</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Subserie),
            }
        });

        this._tipodocumentalController.dispatch({
            type: ActionNameEnum.createElemet, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Tipo documental</div>,
                variant: "outline-light",
                size: "lg",
                disabled: false,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.TipoDocumental),
            }
        });
    }

    public async componentDidMount(): Promise<void> {
        await this.loadData();
    }
    
    private loadData = async () => {

        const service = new ListService();
        const fondo = await service.getListSPAsync(TypeFolderEnum.Fondo,["ID","Title","Codigo"]);
        const seccion = await service.getListSPAsync(TypeFolderEnum.Seccion,["ID","Title","Codigo",`${TypeFolderEnum.Fondo}/ID`],[TypeFolderEnum.Fondo]);
        const subseccion = await service.getListSPAsync(TypeFolderEnum.Subseccion,["ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`],[TypeFolderEnum.Seccion]);
        const serie = await service.getListSPAsync(TypeFolderEnum.Serie, ["ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`,`${TypeFolderEnum.Subseccion}/ID`], [TypeFolderEnum.Seccion,TypeFolderEnum.Subseccion]);
        const subserie = await service.getListSPAsync(TypeFolderEnum.Subserie, ["ID","Title","Codigo","TiempoCentral","TiempoGestion","TiempoHistorico","Eliminacion","Digitalizacion","Conservacion","Seleccion",`${TypeFolderEnum.Serie}/ID`], [TypeFolderEnum.Serie]);

        this.setState({
            ...this.state,
            fondo,
            seccion,
            subseccion,
            serie,
            subserie
        });
    }

    private onSelectTreeItem = (item: IDocumentary, itemSelected: TypeFolderEnum, parentId?: string) => {
        this.disableMenu();
        this._mainController.getState().onChangeView(itemSelected, item);
        const enableAction = { type: ActionNameEnum.disableElement, payload: false };
        if(TypeFolderEnum.Fondo === itemSelected){
            this._seccionController.dispatch(enableAction);
        }

        if(TypeFolderEnum.Seccion === itemSelected){
            this._subseccionController.dispatch(enableAction);
            this._serieController.dispatch(enableAction);
        }

        if(TypeFolderEnum.Subseccion === itemSelected){
            this._serieController.dispatch(enableAction);
        }

        if(TypeFolderEnum.Serie === itemSelected){
            this._subserieController.dispatch(enableAction);
        }

        this._mainController.dispatch({ type:ActionNameEnum.selectTreeItem, payload: {
            parent: item.ID,
            itemSelected
        } });
        this.loadData();
    }

    private disableMenu = () => {
        const action = { type: ActionNameEnum.disableElement, payload: true };
        this._seccionController.dispatch(action);
        this._subseccionController.dispatch(action);
        this._serieController.dispatch(action);
        this._subserieController.dispatch(action);
    }

    public render(){
        return <Page 
            fondo={ this.state.fondo } 
            seccion={ this.state.seccion } 
            subseccion={this.state.subseccion} 
            serie={this.state.serie} 
            subserie={this.state.subserie}
            onSelectTreeItem ={ this.onSelectTreeItem }
        />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryTreeClass);