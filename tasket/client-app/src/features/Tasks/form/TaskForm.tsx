import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik , Form, useField} from "formik";
import * as Yup from 'yup';
import MySelectInput from "../../../app/common/form/MySelectInput";
import { Task } from "../../../app/models/Task";
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import DateInputGeneral from "../../../app/common/form/DateInputGeneral";
import TextAreaGeneral from "../../../app/common/form/TextAreaGeneral";
import { categoryOptions } from "../../../app/common/options/categoryOptions";
import SelectInputGeneral from "../../../app/common/form/SelectInputGeneral";
import { statusOptions } from "../../../app/common/options/statusOptions";

export default observer( function TaskForm(){
    const history = useHistory();
    const {taskStore} = useStore();
    const {
        createTask, 
        updateTask, 
        loading, loadTask, loadingInitial} = taskStore;

    const {id} = useParams<{id: string}>();

    const [task, setTask] = useState<Task>({
        id: 0,
        title: '',
        startDatetimeScheduled: null,
        startDatetimeActual: null,
        endDatetimeScheduled: null,
        endDatetimeActual: null,
        status: 1,
        shortDescription: '',
        longDescription: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The task Title is required'),
        shortDescription: Yup.string().nullable(),
        startDatetimeScheduled: Yup.date().nullable(),
        startDatetimeActual: Yup.date().nullable(),
        endDatetimeScheduled: Yup.date().nullable(),
        endDatetimeActual: Yup.date().nullable(),
        status: Yup.number().required(),
    })

    useEffect(()=>{
        if(id) loadTask(Number(id)).then(task => setTask(task!))
    }, [id, loadTask]);

    
    function handleFormSubmit(task:Task) {
        if(task.id ===0 ){
            let newTask = {
                ...task
            };
            //console.log(newTask);
            createTask(newTask);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            updateTask(task);
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading task..." />

    return(
        <div>         
            <h3>Task Details</h3> 
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <TextInputGeneral label='Title' name='title' placeholder='title' />

                        <TextAreaGeneral label='Short Description' placeholder='shortDescription' name='shortDescription' rows={5}   />

                        <DateInputGeneral placeholderText='Start(Schedule)' name = 'startDatetimeScheduled' dateFormat='MM d, yyyy' />
                        <DateInputGeneral placeholderText='Start(Act)' name = 'startDatetimeActual' dateFormat='MM d, yyyy' />
                        <DateInputGeneral placeholderText='End(Schedule)' name = 'endDatetimeScheduled' dateFormat='MM d, yyyy' />
                        <DateInputGeneral placeholderText='End(Act)' name = 'endDatetimeActual' dateFormat='MM d, yyyy' />
                        <SelectInputGeneral placeholder='status' name='status' options={statusOptions} />

                        <Button disabled={!isValid || !dirty || isSubmitting} 
                            type = 'submit' >Submit</Button>
                        <Link to={`/`}>Cancel</Link>
                    </Form>
                )}

            </Formik>

        </div>
    )
})

const MySelect = (name:string,  label:string, ...props:any ) => {
    const [field, meta] = useField(props);
    return (
      <div>
        <label htmlFor={props.id || props.name}>{label}</label>
        <select {...field} {...props} />
        {meta.touched && meta.error ? (
          <div className="error">{meta.error}</div>
        ) : null}
      </div>
    );
  };