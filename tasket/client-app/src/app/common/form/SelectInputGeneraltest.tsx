import { useField } from "formik";
import React from "react";
import { 
    //Form, 
    //Label, 
    //Select 
} from "semantic-ui-react";
import { DropdownProps, Form } from 'react-bootstrap';
//import Select from 'react-select';
import Select from "react-select";

interface Props{
    placeholder: string;
    name:string;
    options: any;
    label?: string;
}

//https://codesandbox.io/s/react-bootstrap-formik-pb831?from-embed=&file=/src/form-select-field.js:0-1270
export default function SelectInputGeneraltest(props: Props){
    const[field, meta, helpers] = useField(props.name);
    return (
        <Form.Group>
        <label>{props.label}</label>
        

        <Select
          name={props.name}
          value={field.value}
          options={props.options}
          onChange={(d) => helpers.setValue(d.value) }
          onBlur = {() => helpers.setTouched(true)}
        />
      
            {
                //https://qiita.com/Hitomi_Nagano/items/710d76643184ba2258e3
            /*
      <Form.Control as="select" {...field} {...props} />
            <Select
                clearable
                options={props.options}
                value={field.value || null}
                onChange={(e, d) => helpers.setValue(d.value)}
                onBlur = {() => helpers.setTouched(true)}
                placeholder={props.placeholder}
                />
            */ 
            }
        </Form.Group>

    )
}

