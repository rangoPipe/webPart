import * as React from "react";

export interface ISnackbarProps {
    message?: string;
    duration?: number;
    severity?: "error" | "warning" | "info" | "success";
    hidden?: boolean;
    onClose?: () => void;
}