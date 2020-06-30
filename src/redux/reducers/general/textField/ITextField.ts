import * as React from "react";

export interface ITextFieldProps {
    id?: string;
    multiline?: boolean;
    rows?: number;
    label?: string;
    className?: string;
    placeholder?: string;
    hidden?: boolean;
    value?: string | undefined;
    style?: React.CSSProperties;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>, e?: any) => void;
}

