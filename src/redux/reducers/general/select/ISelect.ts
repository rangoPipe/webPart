import * as React from "react";

export interface ISelectProps  {
    label?: React.ElementType<any>;
    className?: string;
    onChange?: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    hidden?: boolean;
    disabled?:boolean;
    items?: ISelectItemProps[];
    value?: string | number;
}


interface ISelectItemProps {
    text: string;
    hidden?: boolean;
    value: any;
    key: string | number;
}