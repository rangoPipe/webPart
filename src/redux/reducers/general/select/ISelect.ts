import * as React from "react";

export interface ISelectProps  {
    label?: React.ElementType<any>;
    className?: string;
    onChange?: (event: React.MouseEvent<HTMLSelectElement, MouseEvent>) => void;
    hidden?: boolean;
    disabled?:boolean;
    items?: ISelectItemProps[];
}


interface ISelectItemProps {
    text: string;
    hidden?: boolean;
    value: any;
    key: string | number;
}