import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button, Header, Segment } from "semantic-ui-react";
import LoadingComponent from "../../../app/layout/LoadingComponents";
import { useStore } from "../../../app/stores/store";
import {v4 as uuid} from 'uuid';
import { Formik , Form} from "formik";
import * as Yup from 'yup';
import MyTextInput from "../../../app/common/form/MyTextInput";
import MyTextArea from "../../../app/common/form/MyTextArea";
import MySelectInput from "../../../app/common/form/MySelectInput";
import { Task } from "../../../app/models/Task";
import TextInputGeneral from "../../../app/common/form/TextInputGeneral";
import MyDateInput from "../../../app/common/form/MyDateInput";
import DateInputGeneral from "../../../app/common/form/DateInputGeneral";
//import { categoryOptions } from "../../../app/common/options/categoryOptions";
//import MyDateInput from "../../../app/common/form/MyDateInput";
//import { Activity } from "../../../app/models/activity";

export default observer( function TaskForm(){
    const history = useHistory();
    const {taskStore} = useStore();
    const {
        createTask, 
        //updateTask, 
        loading, loadTask, loadingInitial} = taskStore;

    const {id} = useParams<{id: string}>();

    const [task, setTask] = useState<Task>({
        id: 0,
        title: '',
        date: null,
        shortDescription: '',
        longDescription: '',
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The task Title is required'),
        date: Yup.date(),
/*        description: Yup.string().required(),
        category: Yup.string().required(),
        date: Yup.string().required('Date is reqired').nullable(),
        city: Yup.string().required(),
        venue: Yup.string().required(),*/
    })

    useEffect(()=>{
        if(id) loadTask(Number(id)).then(task => setTask(task!))
    }, [id, loadTask]);

    
    function handleFormSubmit(task:Task) {
        if(task.id ===0 ){
            let newTask = {
                ...task
            };
            console.log(newTask);
            createTask(newTask);
//            createTask(newActivity).then(() => history.push(`/task/${newTask.Id}`))
        } else {
            //updateActivity(task).then(() => history.push(`/activities/${task.Id}`))
        }
    }

    if(loadingInitial) return <LoadingComponent content="Loading task..." />

    return(
        <Segment clearing>
            <Header content='Task Details' sub color='teal' />
            <Formik 
                validationSchema={validationSchema}
                enableReinitialize 
                initialValues={task} 
                onSubmit={values => handleFormSubmit(values)}>
                {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                    <Form className="ui form" onSubmit = {handleSubmit} autoComplete='off'>
                        <MyTextInput name='Title' placeholder='title' />
                        <DateInputGeneral 
                            placeholderText='Date' 
                            name = 'date'
                            dateFormat='MM d, yyyy'
                        />
                        {
                            /*
                        <DateInputGeneral 
                            placeholderText='Date' 
                            name = 'date'
                            dateFormat='MM d, yyyy'
                        />*/
                            
                        //<MySelectInput placeholder='Category' name='category' options={categoryOptions} />
                            /*
                            <DateInputGeneral 
                                placeholderText='Date' 
                                name = 'date'   
                                showTimeSelect
                                timeCaption="time"
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            
                            
                            
                            
                         
                        <MyTextArea placeholder='Description' name='description' rows={3}   />   
                            
                            
                            
    Id: number;
    Title: string;
    date: Date | null;
    ShortDescription: string;
    LongDescription: string;
                        <Header content='Location Details' sub color='teal' />
                        <MyTextInput placeholder = 'City'  name = 'city'   />
                        <MyTextInput placeholder = 'Venue'  name = 'venue'   />
    
    */
                         }
                        <Button 
                            disabled={
                                isSubmitting
                                 || !dirty
                                 || !isValid
                                }
                            loading={loading} floated="right" positive type = 'submit' content = 'Submit' />
                        <Button as = {Link} to ='/activities' floated="right" type = 'button' content = 'Cancel' />
                    </Form>
                )}

            </Formik>

        </Segment>
    )
})