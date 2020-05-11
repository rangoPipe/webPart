import { IContextProps } from "./reducers/common/IContextProps";
import { ITreeItemProps } from "./reducers/general/treeItem/ITreeItem";
import { IButtonProps } from "./reducers/general/button/IButton";
import { ICardProps } from "./reducers/general/card/ICard";
import { IMainDocumentary } from "./reducers/component/mainDocumentary/IMainDocumentary";
import { IControlProps } from "./reducers/general/control/IControl";
import { ISelectProps } from "./reducers/general/select/ISelect";
import { ICheckProps } from "./reducers/general/check/ICheck";

export interface IStoreGeneral {
    context: IContextProps;
    button: IButtonProps;
    treeItem: ITreeItemProps;
    card: ICardProps;
    control: IControlProps;
    select: ISelectProps;
    check: ICheckProps;
}


export interface IStore extends IStoreGeneral {
    //DocumentaryMain
    stateMainDocumentary:   IMainDocumentary;

    //DocumentaryTree
    contextDocumentary:      IContextProps;
    btnFondoDocumentary:     IButtonProps;
    btnSeccionDocumentary:   IButtonProps;
    btnSubseccionDocumentary:IButtonProps;
    btnSerieDocumentary:     IButtonProps;
    btnSubserieDocumentary:  IButtonProps;
    btnTipoDocumentary:      IButtonProps;

    //DocumentaryForm
    contextDocumentaryForm:     IContextProps;
    btnSaveDocumentaryForm:     IButtonProps;
    btnCancelDocumentaryForm:   IButtonProps;
    txtNombreDocumentaryForm:   IControlProps;
    txtCodigoDocumentaryForm:   IControlProps;
    lstCentralDocumentaryForm:  ISelectProps;
    lstGestionDocumentaryForm:  ISelectProps;
    lstHistoryDocumentaryForm:  ISelectProps;
    lstSecurityDocumentaryForm: ISelectProps;
    chkKeepDocumentaryForm:     ICheckProps;
    chkSelectDocumentaryForm:   ICheckProps;
    chkDigitizeDocumentaryForm: ICheckProps;
    chkDeleteDocumentaryForm:   ICheckProps;
}

export interface IAction {
    /**
     * Almacena el nombre de la accion
     */
    type:string;

    /**
     * Suministra el valor a tratar por el reducer
     */
    payload?:any;
}