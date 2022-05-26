import { useField } from "formik";
import React from "react";
//import { Form, Label } from "semantic-ui-react";
import { Form } from 'react-bootstrap'

interface Props{
    placeholder: string;
    name:string;
    type?: string;
    label?: string;
}

export default function TextInputGeneral(props: Props){
    const[field, meta] = useField(props.name);
    return (
        <>
        <Form.Group>
            <Form.Label>{props.label}</Form.Label>
            <Form.Control {...field} {...props} />
            {meta.touched && meta.error ? (
                <Form.Label>{meta.error}</Form.Label>
            ) : null}
        </Form.Group>
        </>
    )
}