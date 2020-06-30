import * as React from "react";

export interface ISelectProps  {
    id?: string;
    label?: React.ElementType<any> | string;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>, e?: any) => void;
    hidden?: boolean;
    disabled?:boolean;
    items?: ISelectItemProps[];
    value?: ISelectItemProps | ISelectItemProps[];
    placeholder?:string;
    multiple?: boolean;
    disableCloseOnSelect?: boolean;
}


export interface ISelectItemProps {
    text: string;
    hidden?: boolean;
    value?: any;
    key: string | number;
}