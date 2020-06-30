import * as React from "react";
import { ICheckProps } from "./ICheck";
import { FormControlLabel, Checkbox } from "@material-ui/core";

export default function Page(props: ICheckProps) {
    const { check } = props;
    return (
        (check.hidden)
        ? null
        : <FormControlLabel
                control={<Checkbox checked={check.checked} onChange={check.onChange} color="default" id={check.id} onClick={check.onClick} />}
                label={check.label}
        />
    );
}