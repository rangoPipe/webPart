import { IDetailListProps } from "./reducers/general/detailList/IDetailListProps";
import { IDialogProps } from "./reducers/general/dialog/IDialogProps";
import { ITextFieldProps } from "./reducers/general/textField/ITextFieldProps";
import { IMessageBarProps } from "./reducers/general/messageBar/IMessageBarProps";
import { IContextProps } from "./reducers/common/IContextProps";
import { ICommandBarProps } from "./reducers/general/commandBar/ICommandBarProps";
import { IButtonProps } from "./reducers/general/button/IButtonProps";
import { IChoiceGroupProps } from "./reducers/general/choiceGroup/IChoiceGroupProps";
import { IDropdownProps } from "./reducers/general/dropdown/IDropdownProps";
import { IModalProps } from "./reducers/general/modal/IModalProps";
import { IDatePickerProps } from "./reducers/general/datePicker/IDatePickerProps";
import { ICheckboxProps } from "./reducers/general/checkbox/ICheckboxProps";

export const contextNs:string = "context";
export const detailListNs:string = "detailList";
export const detailList2Ns:string = "detailList2";
export const detailList3Ns:string = "detailList3";
export const detailList4Ns:string = "detailList4";
export const dialogNs:string = "dialog";
export const textFieldNs:string = "textField";
export const messageBarNs:string = "messageBar";
export const commandBarNs:string = "commandBar";
export const buttonNS:string = "buttonNS";
export const choiceGroupNS:string = "choiceGroupNS";
export const dropdownNS:string = "dropdownNS";
export const modalNS:string = "modalNs";

export interface IIOIPStoreGeneral {
    /**
     * Almacena componentes globales
     */
    context:IContextProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de DetailList de UiFabric
     */
    detailList:IDetailListProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de Dialog de UiFabric
     */
    dialog:IDialogProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de TextField de UiFabric
     */
    textField:ITextFieldProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de MessageBar de UiFabric
     */
    messageBar:IMessageBarProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de CommandBar de UiFabric
     */
    commandBar:ICommandBarProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de button de UiFabric
     */
    button:IButtonProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de choiceGroup de UiFabric
     */
    choiceGroup:IChoiceGroupProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de dropdown de UiFabric
     */
    dropdown:IDropdownProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de modal de UiFabric
     */
    modal:IModalProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de datePicker de UiFabric
     */
    datePicker:IDatePickerProps;

    /**
     * Almacena las propiedades nativas y genericas para el componente general de checkbox de UiFabric
     */
    checkbox:ICheckboxProps;
}


export interface IIOIPStore extends IIOIPStoreGeneral {
    //Owner
    contextOwner:            IContextProps;
    detailListOwner:         IDetailListProps;
    dialogOwner:             IDialogProps;
    textAreaOwner:           ITextFieldProps;
    messageBarOwner:         IMessageBarProps;
    commandBarOwner:         ICommandBarProps;
    
    //Lending - Search 
    detailListSearch:         IDetailListProps;
    dropDownSectionSearch:    IDropdownProps;
    dropDownSubsectionSearch: IDropdownProps;
    dropDownSerieSearch:      IDropdownProps;
    dropDownSubserieSearch:   IDropdownProps;
    buttonSearchSearch:       IButtonProps;
    buttonLendSearch:         IButtonProps;
    buttonCancelSearch:       IButtonProps;
    modalSearch:              IModalProps;
    textAreaSearch:           ITextFieldProps;
    messageBarSearch:         IMessageBarProps;

    //Lending - Sended 
    detailListSended:         IDetailListProps;
    commandBarSended:         ICommandBarProps;
    modalSended:              IModalProps;
    dialogSended:             IDialogProps;

    //Lending - Received 
    detailListReceived:       IDetailListProps;
    commandBarReceived:       ICommandBarProps;
    modalReceived:            IModalProps;
    textAreaReceived:         ITextFieldProps;
    messageBarReceived:       IMessageBarProps;
    choiceGroupReceived:      IChoiceGroupProps;
    btnLeadReceived:          IButtonProps;

    //Lending - Lending 
    detailListLending:        IDetailListProps;
    commandBarLending:        ICommandBarProps;
    dialogLending:            IDialogProps;
    modalLending:             IModalProps;
    textAreaLending:          ITextFieldProps;
    messageBarLending:        IMessageBarProps;

    //Lending - Payback 
    detailListPayback:        IDetailListProps;
    commandBarPayback:        ICommandBarProps;
    dialogPayback:            IDialogProps;

    //Lending - Report 
    detailListReport:         IDetailListProps;
    buttonSearchReport:       IButtonProps;
    buttonCancelReport:       IButtonProps;
    datePickerStartReport:    IDatePickerProps;
    datePickerEndReport:      IDatePickerProps;
    chkSendedReport:          ICheckboxProps;
    chkRequestReport:         ICheckboxProps;
    chkAcceptedReport:        ICheckboxProps;
    chkRejectedReport:        ICheckboxProps;
    chkLendedReport:          ICheckboxProps;
    chkPaybackReport:         ICheckboxProps;
}

export interface IAction {
    /**
     * Almacena el nombre de la accion
     */
    type:string;

    /**
     * Suministra el valor a tratar por el reducer
     */
    payload:any;
}