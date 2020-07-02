import * as React from "react";
import { ISnackbarProps } from "./ISnackbar";
import { Alert } from "@material-ui/lab";
import { Snackbar } from "@material-ui/core";

export default function Page(props: ISnackbarProps) {
    const { snackbar } = props;
    return (
        <Snackbar open={snackbar.show} autoHideDuration={snackbar.duration} onClose={snackbar.onClose} anchorOrigin={snackbar.position}>
            <Alert onClose={snackbar.onClose} severity={snackbar.severity}>
                {snackbar.message}
            </Alert>
        </Snackbar>
    );
}