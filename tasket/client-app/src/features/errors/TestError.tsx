import React, { useState } from 'react';
import axios from 'axios';
import ValidationErrors from './ValidationErrors';
import { Button, ButtonGroup } from 'react-bootstrap';

export default function TestErrors() {
    const baseUrl = 'https://localhost:5001/api/'
    const [errors, setErrors] = useState(null);

    function handleNotFound() {
        axios.get(baseUrl + 'buggy/not-found').catch(err => console.log(err.response));
    }

    function handleBadRequest() {
        axios.get(baseUrl + 'buggy/bad-request').catch(err => console.log(err.response));
    }

    function handleServerError() {
        axios.get(baseUrl + 'buggy/server-error').catch(err => console.log(err.response));
    }

    function handleUnauthorised() {
        axios.get(baseUrl + 'buggy/unauthorised').catch(err => console.log(err.response));
    }

    function handleBadGuid() {
        axios.get(baseUrl + 'articles/notaguid').catch(err => console.log(err));
    }

    function handleValidationError() {
        axios.post(baseUrl + 'articles', {}).catch(err => setErrors(err));
    }

    return (
        <>
            <h1>Test Error component</h1>
            <div>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={handleNotFound} >Not Found</Button>
                    <Button onClick={handleBadRequest} >Not Found</Button>
                    <Button onClick={handleValidationError} >Validation Error</Button>
                    <Button onClick={handleServerError} >Server Error</Button>
                    <Button onClick={handleUnauthorised} >Unauthorised</Button>
                    <Button onClick={handleBadGuid} >Bad Guid</Button>
                </ButtonGroup>
            </div>
            {errors &&
                <ValidationErrors errors={ errors } />
            }
        </>
    )
}
