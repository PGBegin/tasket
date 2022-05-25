import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
//import { Grid, GridColumn } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

export default observer(function TaskIndex() {      
    
    const {taskStore} = useStore();
    const {loadTasks, taskRegistry} = taskStore;
  
    useEffect(() => {
        if(taskRegistry.size <= 1) loadTasks();
    },[taskRegistry.size, loadTasks])
  
  
    if(taskStore.loadingInitial) return <LoadingComponent content='Loading tasks...' />



    return(
        <Container>
            <p>test</p>
        </Container>

        
    )
})