import * as React from "react";
import { IButtonProps } from "./IButton";
import { Button } from "@material-ui/core";

export default function Page(props: IButtonProps) {
    const { button } = props;
    return (
        (button.hidden)
        ? null
        :   <Button
                startIcon={button.startIcon}
                endIcon={button.endIcon}
                onClick={button.onClick}
                variant={button.variant}
                className={button.className }
                disabled = {button.disabled}
                color={button.color}
                >
                {button.text}
            </Button>
    );
}