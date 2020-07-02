import * as React from "react";

export interface ISnackbarProps {
    message?: string;
    position?: { vertical:'top' | 'bottom', horizontal: 'center' | 'right' | 'left' };
    duration?: number;
    severity?: "error" | "warning" | "info" | "success";
    show?: boolean;
    onClose?: () => void;
}