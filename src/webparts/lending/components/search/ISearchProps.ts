import { IButtonProps } from "../../../../redux/reducers/general/button/IButtonProps";
import { IChoiceGroupProps } from "../../../../redux/reducers/general/choiceGroup/IChoiceGroupProps";
import { ITextFieldProps } from "../../../../redux/reducers/general/textField/ITextFieldProps";
import { IDropdownProps } from "../../../../redux/reducers/general/dropdown/IDropdownProps";
import { IDetailListProps } from "../../../../redux/reducers/general/detailList/IDetailListProps";
import { IDropdownOption } from "office-ui-fabric-react";

export interface ISearchProps {
    namespace?:string;
    sectionVisible?:SectionVisibleEnum;
    resultVisible?:boolean;

    buttons?:IButtonProps[];
    choiceGroup?:IChoiceGroupProps;
    textField?: ITextFieldProps[];
    dropdowns?: IDropdownProps[];
    resultDetailList?: IDetailListProps;

    detailList?:IDetailListProps;
}

export interface ISearchState {
    sectionVisible:SectionVisibleEnum;
    resultVisible:boolean;
    hideLendingButton:boolean;

    noRecord:string;
    titleRecord:string;
    noFiled:string;
    subjectFiled:string;
    noTypeDocumental:string;
    titleTypeDocumental:string;

    optSection : IDropdownOption[],
    optSubsection : IDropdownOption[],
    optSerie : IDropdownOption[],
    optSubserie : IDropdownOption[],
}


export enum SectionVisibleEnum {
    Record = 0,
    Filed = 1,
    DocumentalType = 2
}

export enum IdDropdownsEnum {
    ddlSection,
    ddlSubsection,
    ddlSerie,
    ddlSubserie
}