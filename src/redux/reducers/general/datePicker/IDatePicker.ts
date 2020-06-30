import * as React from "react";

export interface IDatePickerProps {
    id?: string;
    label?: string;
    className?: string;
    format?: string;
    hidden?: boolean;
    value?: string | undefined;
    style?: React.CSSProperties;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, e?: any) => void;
}

