import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IDocumentaryTreeProps, IDocumentaryTreeState } from "./IDocumentaryTree";
import { DocumentaryTreeEnum, TypeFolderEnum, IDocumentary } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { MainDocumentaryEnum } from "../../../common/documentary/main/mainDocumentaryEnum";
import { createButton, disableItem } from "../../../redux/actions/general/button/_actionName";
import { selectTreeItem } from "../../../redux/actions/component/documentaryStructure/mainDocumentary/_actionName";

import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";
import Page from "./page";
import { loadItems } from "../../../redux/actions/general/select/_actionName";

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
        
        this._stateController.dispatch({type: loadItems, payload: this.loadData});
        
        this._fondoController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Fondo</div>,
                variant: "outline-light",
                size: "lg",
                disabled: false,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Fondo)
            }
        });

        this._seccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Sección</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Seccion)
            }
        });

        this._subseccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subsección</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Subseccion),
            }
        });

        this._serieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Serie</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Serie),
            }
        });

        this._subserieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subserie</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.Subserie),
            }
        });

        this._tipodocumentalController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Tipo documental</div>,
                variant: "outline-light",
                size: "lg",
                disabled: true,
                onClick: () => this._mainController.getState().onChangeView(TypeFolderEnum.TipoDocumental),
            }
        });
    }

    public async componentDidMount(): Promise<void> {
        await this.loadData();
    }
    
    private loadData = async () => {
        const fondo = await sp.web.lists.getByTitle(TypeFolderEnum.Fondo).items.select("ID","Title","Codigo").getAll()
        .then((data) => { return data; });

        const seccion = await sp.web.lists.getByTitle(TypeFolderEnum.Seccion).items.select("ID","Title","Codigo",`${TypeFolderEnum.Fondo}/ID`).expand(TypeFolderEnum.Fondo).getAll()
        .then((data) => { return data; });

        const subseccion = await sp.web.lists.getByTitle(TypeFolderEnum.Subseccion).items.select("ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`).expand(TypeFolderEnum.Seccion).getAll()
        .then((data) => { return data; });

        const serie = await sp.web.lists.getByTitle(TypeFolderEnum.Serie).items.select("ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`,`${TypeFolderEnum.Subseccion}/ID`).expand(TypeFolderEnum.Seccion,TypeFolderEnum.Subseccion).getAll()
        .then((data) => {return data; });

        const subserie = await sp.web.lists.getByTitle(TypeFolderEnum.Subserie).items.select("ID","Title","Codigo","TiempoCentral","TiempoGestion","TiempoHistorico","Eliminacion","Digitalizacion","Conservacion","Seleccion",`${TypeFolderEnum.Serie}/ID`).expand(TypeFolderEnum.Serie).getAll()
        .then((data) => {return data; });

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
        const enableAction = { type: disableItem, payload: false };
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

        if(TypeFolderEnum.Subserie === itemSelected){
            this._tipodocumentalController.dispatch(enableAction);
        }

        this._mainController.dispatch({ type:selectTreeItem, payload: {
            parent: item.ID,
            itemSelected
        } });
        this.loadData();
    }

    private disableMenu = () => {
        const action = { type: disableItem, payload: true };
        this._seccionController.dispatch(action);
        this._subseccionController.dispatch(action);
        this._serieController.dispatch(action);
        this._subserieController.dispatch(action);
        this._tipodocumentalController.dispatch(action);
    }

    private orderData = () => {

        let serie = this.state.serie;
        let subseccion = this.state.subseccion;
        let seccion = this.state.seccion;
        let fondo = this.state.fondo;

        serie.forEach( (se) => {
            if(this.state.subserie)
                se[TypeFolderEnum.Subserie] = this.state.subserie.filter(sse => sse[TypeFolderEnum.Serie].ID === se.ID );
        });
    
        subseccion.forEach( (se) => {
            if(serie)
                se[TypeFolderEnum.Serie] = serie.filter(sse => sse[TypeFolderEnum.Subseccion].ID === se.ID );
        });
    
        seccion.forEach( (se) => {
            if(subseccion)
            se[TypeFolderEnum.Subseccion] = subseccion.filter(sse => sse[TypeFolderEnum.Seccion].ID === se.ID );
        });
    
        fondo.forEach( (se) => {
            if(seccion)
            se[TypeFolderEnum.Seccion] = seccion.filter(sse => sse[TypeFolderEnum.Fondo].ID === se.ID );
        });

        return fondo;
        
    }

    private viewData = (data, type: TypeFolderEnum) => {

        let child:TypeFolderEnum;
        let toFilter = [];
        switch(type){
            case TypeFolderEnum.Fondo: 
                child = TypeFolderEnum.Seccion;
                toFilter = this.state.seccion;
            break;
            case TypeFolderEnum.Seccion: 
                child = TypeFolderEnum.Subseccion;
                toFilter = this.state.subseccion;
            break;
            case TypeFolderEnum.Subseccion: 
                child = TypeFolderEnum.Serie;
                toFilter = this.state.serie;
            break;
            case TypeFolderEnum.Serie: 
                child = TypeFolderEnum.Subserie;
                toFilter = this.state.subserie;
            break;
        }
        
        data.forEach((item) => {
           //this.viewData(toFilter, child);
           //console.log(item);
        });

        console.log(data);
        
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