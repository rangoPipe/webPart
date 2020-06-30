import * as React from "react";

export interface IButtonProps {
    text?: React.ElementType<any> | React.ReactElement | string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hidden?: boolean;
    disabled?: boolean;
    variant?: "contained" | "outlined" | "text";
    color?: "inherit" | "primary" | "secondary" | "default";
}