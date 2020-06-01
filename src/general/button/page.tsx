import * as React from "react";
import { Button } from 'react-bootstrap';
import { IButtonProps } from "./IButton";

export default function Page(props: IButtonProps) {
    const { button } = props;
    return (
        (button.hidden)
        ? null
        :   <Button
                type={button.type}
                onClick={button.onClick}
                variant={button.variant}
                size={button.size}
                className={button.className }
                disabled = {button.disabled}
                >
                {button.text}
            </Button>
    );
}