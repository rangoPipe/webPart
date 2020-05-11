import * as React from "react";
import { Form } from 'react-bootstrap';
import { ICheckProps } from "./ICheck";

export default function Page(props: ICheckProps) {
    const { check } = props;
    return (
        (check.hidden)
        ? null
        : <Form.Check label={check.label} type={check.type} id={ check.id } className = {check.className} inline />
    );
}