import * as React from "react";
import { connect } from "react-redux";
import { subspace } from "redux-subspace";

import { IDocumentaryFormProps, IDocumentaryFormState } from "./IDocumentaryForm";
import { IStore } from "../../../redux/namespace";
import store from "../../../redux/store";

import Page from "./page";
import { DocumentaryFormEnum } from "../../../common/documentary/documentaryForm/documentaryTreeEnum";
import { createButton } from "../../../redux/actions/general/button/_actionName";
import { createControl } from "../../../redux/actions/general/control/_actionName";
export class DocumentaryFormClass extends React.Component<IDocumentaryFormProps,IDocumentaryFormState> {

    //private _fondoController = subspace( (state: IStore) => state.contextDocumentaryForm, DocumentaryFormEnum.contextDocumentaryForm )(store);
    private _btnSaveController = subspace( (state: IStore) => state.btnSeccionDocumentary, DocumentaryFormEnum.btnSave )(store);
    private _btnCancelController = subspace( (state: IStore) => state.btnSubseccionDocumentary, DocumentaryFormEnum.btnCancel )(store);
    private _txtNombreController = subspace( (state: IStore) => state.btnSerieDocumentary, DocumentaryFormEnum.txtNombre )(store);
    private _txtCodigoController = subspace( (state: IStore) => state.btnSubserieDocumentary, DocumentaryFormEnum.txtCodigo )(store);

    constructor(props:IDocumentaryFormProps){
        super(props);

        this._btnSaveController.dispatch({
            type: createButton, payload: {
                text: "Guardar",
                variant: "outline-dark"
            }
        });

        this._btnCancelController.dispatch({
            type: createButton, payload: {
                text: "Cancelar",
                variant: "outline-dark"
            }
        });

        this._txtNombreController.dispatch({
            type: createControl, payload: {
                label: "Nombre:",
                placeholder: "Nombre",
                variant: "outline-dark",
                type: "text",
            }
        });

        this._txtCodigoController.dispatch({
            type: createControl, payload: {
                label: "Código:",
                placeholder: "Código",
                variant: "outline-dark",
                type: "text",
            }
        });
    }

    public render(){
        return <Page activeView = { this.props.activeView } onCancel = { this.props.onCancel } />;
    }
}

const mapStateToProps = (state: IStore) => {  
    return {
    };
  };
  
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentaryFormClass);