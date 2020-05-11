import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IDocumentaryTreeProps, IDocumentaryTreeState } from "./IDocumentaryTree";
import { DocumentaryTreeEnum, TypeFolderEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
import { createButton } from "../../../redux/actions/general/button/_actionName";

import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";
import Page from "./page";

export class DocumentaryTreeClass extends React.Component<IDocumentaryTreeProps,IDocumentaryTreeState> {

    private _contextController = subspace ( (state: IStore) => state.contextDocumentary, DocumentaryTreeEnum.contextDocumentary )(store);
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
        }
        
        this._fondoController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Fondo</div>,
                variant: "outline-light",
                size: "lg",
            }
        });

        this._seccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Sección</div>,
                variant: "outline-light",
                size: "lg",
            }
        });

        this._subseccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subsección</div>,
                variant: "outline-light",
                size: "lg",
            }
        });

        this._serieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Serie</div>,
                variant: "outline-light",
                size: "lg",
            }
        });

        this._subserieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subserie</div>,
                variant: "outline-light",
                size: "lg",
            }
        });

        this._tipodocumentalController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Tipo documental</div>,
                variant: "outline-light",
                size: "lg",
            }
        });
    }

    public async componentDidMount(): Promise<void> {

       /* 
       const fondo = await sp.web.lists.getByTitle(TypeFolderEnum.Fondo).items.select("ID","Title","Codigo").getAll()
        .then((data) => { return data; });

        const seccion = await sp.web.lists.getByTitle(TypeFolderEnum.Seccion).items.select("ID","Title","Codigo",`${TypeFolderEnum.Fondo}/ID`).expand(TypeFolderEnum.Fondo).getAll()
        .then((data) => { return data; });

        const subseccion = await sp.web.lists.getByTitle(TypeFolderEnum.Subseccion).items.select("ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`).expand(TypeFolderEnum.Seccion).getAll()
        .then((data) => { return data; });

        const serie = await sp.web.lists.getByTitle(TypeFolderEnum.Serie).items.select("ID","Title","Codigo",`${TypeFolderEnum.Seccion}/ID`,`${TypeFolderEnum.Subseccion}/ID`).expand(TypeFolderEnum.Seccion,TypeFolderEnum.Subseccion).getAll()
        .then((data) => {return data; });

        const subserie = await sp.web.lists.getByTitle(TypeFolderEnum.Subserie).items.select("ID","Title","Codigo",`${TypeFolderEnum.Serie}/ID`).expand(TypeFolderEnum.Serie).getAll()
        .then((data) => {return data; });

        this.setState({
            ...this.state,
            fondo,
            seccion,
            subseccion,
            serie,
            subserie
        })
       */

        
        
    }

    public saveForm(type: TypeFolderEnum, data) {
        
    }

    public render(){
        return <Page fondo={ this.state.fondo } seccion={ this.state.seccion } subseccion={this.state.subseccion} serie={this.state.serie} subserie={this.state.subserie} />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryTreeClass);