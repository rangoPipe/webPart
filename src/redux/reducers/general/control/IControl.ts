import { FormControlProps } from "react-bootstrap";

export interface IControlProps extends FormControlProps {
    label?: string;
    className?: string;
    placeholder?: string;
    hidden?: boolean;
}

