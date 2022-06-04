import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

export default observer(function TaskIndex() {      
    
    const {taskStore} = useStore();
    const {loadTasks, taskRegistry, isLoadingFinished} = taskStore;
  
    useEffect(() => {
        if(taskRegistry.size <= 1) loadTasks().then(()=>{
            //console.log(Array.from(taskRegistry.values()).map(x => "called:" +  x.Id.toString()+","))
        });

        
    },[taskRegistry.size, loadTasks])
  
  
    if(!isLoadingFinished) return <LoadingComponent content='Loading task...' />



    return(
        <Container>
        <>
            <Link to={`/createTask`}>
                Create Task
            </Link>

            <hr />

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        Array.from(taskRegistry.values()).map(task=>(
                            <tr key={task.id}>
                                <td> <Link to={`/edittask/${task.id}`}>{task.id}</Link> </td>
                                <td> {task.title} </td>
                                <td> {task.status} </td>
                            </tr> 
                    )) }
                </tbody>
            </Table>
        </>
        </Container>

        
    )
})