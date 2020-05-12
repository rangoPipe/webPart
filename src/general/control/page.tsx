import * as React from "react";
import { Form } from 'react-bootstrap';
import { IControlProps } from "./IControl";

export default function Page(props: IControlProps) {
    const { control } = props;
    return (
        (control.hidden)
        ? null
        : <div>
            {
                (control.label)
                ? <h3>{control.label}</h3>
                :null
            }
            <Form.Control type={control.type} className={control.className} placeholder = { control.placeholder } onChange={control.onChange} value={control.value} />
        </div> 
        
    );
}