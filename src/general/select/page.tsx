import * as React from "react";
import { Form } from 'react-bootstrap';
import { ISelectProps } from "./ISelect";

export default function Page(props: ISelectProps) {
    const { select } = props;
    return (
        
        (select.hidden)
        ? null
        :
            <div>
                {
                    (select.label)
                    ? <h3>{select.label}</h3>
                    : null
                }
                <Form.Control as="select" className={select.className} disabled={select.disabled} onChange={select.onChange} value={select.value}>
                    {
                        select.items.map((item) => {
                            return <option value={item.value} hidden={item.hidden} key={item.key}>{item.text}</option>;
                        })
                    }
                </Form.Control>
            </div>
    );
}