import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { IDocumentaryTreeProps, IDocumentaryTreeState } from "./IDocumentaryTree";
import { DocumentaryTreeEnum } from "../../../common/documentary/documentaryTree/documentaryTreeEnum";
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
        
        this._fondoController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Fondo</div>,
                variant: "outline-light"
            }
        });

        this._seccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Sección</div>,
                variant: "outline-light"
            }
        });

        this._subseccionController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subsección</div>,
                variant: "outline-light"
            }
        });

        this._serieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Serie</div>,
                variant: "outline-light"
            }
        });

        this._subserieController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Subserie</div>,
                variant: "outline-light"
            }
        });

        this._tipodocumentalController.dispatch({
            type: createButton, payload: {
                text: <div><FontAwesomeIcon icon={faPlus} /> Tipo documental</div>,
                variant: "outline-light"
            }
        });
    }

    public render(){
        return <Page />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryTreeClass);