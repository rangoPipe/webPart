import { IChoiceGroupProps } from "../../../../redux/reducers/general/choiceGroup/IChoiceGroupProps";
import { ITextFieldProps } from "../../../../redux/reducers/general/textField/ITextFieldProps";

export interface ISearchProps {
    sectionVisible?:SectionVisibleEnum;
    resultVisible?:boolean;
    modalVisible?:boolean;

    choiceGroup?:IChoiceGroupProps;
    textField?: ITextFieldProps[];
}

export interface ISearchState {
    sectionVisible:SectionVisibleEnum;
    resultVisible:boolean;
    modalVisible?:boolean;

    noRecord:string;
    titleRecord:string;
    noFiled:string;
    subjectFiled:string;
    noTypeDocumental:string;
    titleTypeDocumental:string;
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