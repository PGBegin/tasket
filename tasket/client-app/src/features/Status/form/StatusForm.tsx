import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import { Formik , Form, useField} from "formik";
import * as Yup from 'yup';
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import { Status } from "../../../app/models/Status";

export default observer( function StatusForm(){
    const history = useHistory();
    const {statusStore} = useStore();
    const { createStatus, updateStatus, deleteStatus, loading, loadStatus, loadingInitial} = statusStore;

    const {id} = useParams<{id: string}>();

    const [status, setStatus] = useState<Status>({
        status: 0,
        title: '',
    });

    const validationSchema = Yup.object({
//        status: Yup.number().required(),
        title: Yup.string().required('The task Title is required'),
    });

    const validationSchemaDel = Yup.object({
        status: Yup.number()
        .min(1, 'The minimum amount is one').required(),
//        title: Yup.string().required('The task Title is required'),
    });

    useEffect(()=>{
        if(id) loadStatus(Number(id)).then(status => setStatus(status!))
    }, [id, loadStatus]);

    
    function handleFormSubmit(status:Status) {
        if(status.status ===0 ){
            let newStatus = {
                ...status
            };
            //console.log(newTask);
            createStatus(newStatus);
        } else {
            updateStatus(status);
        }
    }

    
    function handleFormSubmitDelete(status:Status) {
        console.log("called");
        if(status.status ===0 ){
        } else {
            deleteStatus(status.status);
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Status Details</h3> 
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={status} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <TextInputGeneral label='Title' name='title' placeholder='title' />

                        <Button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</Button>
                        <Link to={`/`}>Cancel</Link>
                    </Form>
                )}
            </Formik>

            <Formik 
                validationSchema={validationSchemaDel}
                enableReinitialize 
                initialValues={status} 
                onSubmit={values => handleFormSubmitDelete(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <Button disabled={!isValid || isSubmitting} 
                            type = 'submit' variant="danger" >Delete</Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
})