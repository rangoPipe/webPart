import { FormCheckProps } from "react-bootstrap";

export interface ICheckProps extends FormCheckProps {
    label?: string;
    className?: string;
    placeholder?: string;
    hidden?: boolean;
    checked?: boolean;
    onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

