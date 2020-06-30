import { ITreeViewProps } from "./reducers/general/treeView/ITreeView";
import { IButtonProps } from "./reducers/general/button/IButton";
import { ICardProps } from "./reducers/general/card/ICard";
import { IMainDocumentary } from "./reducers/component/documentaryStructure/mainDocumentary/IMainDocumentary";
import { IDocumentaryTree } from "./reducers/component/documentaryStructure/documentaryTree/IDocumentaryTree";
import { IControlProps } from "./reducers/general/control/IControl";
import { ISelectProps } from "./reducers/general/select/ISelect";
import { ICheckProps } from "./reducers/general/check/ICheck";
import { ITextFieldProps } from "./reducers/general/textField/ITextField";
import { IDatePickerProps } from "./reducers/general/datePicker/IDatePicker";
import { IContextProps } from "./reducers/webPart/IContext";
import { IGridProps } from "./reducers/general/grid/IGrid";
import { IViewerProps } from "./reducers/general/viewer/IViewer";

export interface IStoreGeneral {
    button: IButtonProps;
    treeView: ITreeViewProps;
    card: ICardProps;
    control: IControlProps;
    textField: ITextFieldProps;
    select: ISelectProps;
    check: ICheckProps;
    datePicker: IDatePickerProps;
    grid: IGridProps;
    viewer: IViewerProps;
    context: IContextProps;
}

export interface IStore extends IStoreGeneral {
    //MainApp
    appContext:            IContextProps;
    btnAdminMainApp:       IButtonProps;
    btnStructureMainApp:   IButtonProps;
    btnSearchMainApp:      IButtonProps;

    //DocumentaryMain
    stateMainDocumentary:   IMainDocumentary;

    //DocumentaryTree
    stateDocumentaryTree:    IDocumentaryTree;
    btnFondoDocumentary:     IButtonProps;
    btnSeccionDocumentary:   IButtonProps;
    btnSubseccionDocumentary:IButtonProps;
    btnSerieDocumentary:     IButtonProps;
    btnSubserieDocumentary:  IButtonProps;
    btnTipoDocumentary:      IButtonProps;

    //DocumentaryForm
    btnSaveDocumentaryForm:     IButtonProps;
    btnCancelDocumentaryForm:   IButtonProps;
    txtIdDocumentaryForm:       IControlProps;
    txtNombreDocumentaryForm:   ITextFieldProps;
    txtCodigoDocumentaryForm:   ITextFieldProps;
    lstCentralDocumentaryForm:  ISelectProps;
    lstGestionDocumentaryForm:  ISelectProps;
    lstHistoryDocumentaryForm:  ISelectProps;
    lstSecurityDocumentaryForm: ISelectProps;
    lstColumnDocumentaryForm:   ISelectProps;
    chkKeepDocumentaryForm:     ICheckProps;
    chkSelectDocumentaryForm:   ICheckProps;
    chkDigitizeDocumentaryForm: ICheckProps;
    chkDeleteDocumentaryForm:   ICheckProps;

    //AdminForm
    txtSearchAdminForm:         ITextFieldProps;
    lstTypeAdminForm:           ISelectProps;
    lstDocumentalTypeAdminForm: ISelectProps;
    btnSaveAdminForm:           IButtonProps;
    btnCancelAdminForm:         IButtonProps;

    //AdminList
    gridListAdmin:     IGridProps;

    //AdminView
    viewerAdminView:   IViewerProps;
}