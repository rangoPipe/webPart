import * as React from "react";
import { ButtonProps } from "react-bootstrap";

export interface IButtonProps extends ButtonProps {
    text?: React.ElementType<any> | string;
    className?: string;
    onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    hidden?: boolean;
}