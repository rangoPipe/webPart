import * as React from "react";
import { Form } from 'react-bootstrap';
import { IControlProps } from "./IControl";

export default function Page(props: IControlProps) {
    const { control } = props;
    return (
        <Form.Control type={control.type} className={control.className} placeholder = { control.placeholder } />
    );
}