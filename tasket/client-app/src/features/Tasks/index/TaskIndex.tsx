import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
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
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        Array.from(taskRegistry.values()).map(x=>(
                            <tr key={x.id}>
                                <td>{x.id}</td>
                                <td>
                                        <Link to={`/edittask/${x.id}`}>
                                            {x.title}
                                        </Link>
                                </td>
                            </tr> 
                    )) }
                </tbody>
            </table>
        </>
        </Container>

        
    )
})