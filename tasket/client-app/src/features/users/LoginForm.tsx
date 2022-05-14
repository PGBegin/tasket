import { ErrorMessage, Formik } from "formik";
import { observer } from "mobx-react-lite";
import React from "react";
import { Button, Form } from "react-bootstrap";
//import { Button } from "semantic-ui-react";
//import { Header } from "semantic-ui-react";
//import { Label } from "semantic-ui-react";
import MyTextInput from "../../app/common/form/MyTextInput";
import { useStore } from "../../app/stores/store";

export default observer( function LoginForm() {
    const {userStore} = useStore();
    return (
        <Formik
            initialValues={{email:'', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.login(values).catch(error => 
                setErrors({error:'Invalid email or password'}))}
            >
                {({handleSubmit, isSubmitting, errors}) =>(
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete='off'>
                        <h3>Login</h3>
                        <MyTextInput name='email' placeholder="Email" />
                        <MyTextInput name='password' placeholder="Password" type="password" />
                        <ErrorMessage 
                            name='error' render={() => 
                                <>
                                    {
                                        //<Label style = {{marginBottom:10}} basic color='red' content ={errors.error} />
                                    }
                                    <Form.Label style = {{marginBottom:10}} basic color='red' >{errors.error}</Form.Label>
                                </>
                        }
                        />
                        <button type = 'submit' className="btn btn-primary" />
                    </Form>
                )}
            </Formik>
    )
})