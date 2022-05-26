import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
//import { Grid, GridColumn } from 'semantic-ui-react'
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
  
  
    if(!isLoadingFinished) return <LoadingComponent content='Loading tasks...' />



    return(
        <Container>
        <>
            { 
                Array.from(taskRegistry.values()).map(x=>(                    

                    <div key={x.id}>
                        <div>
                            <Link to={`/article/${x.id}`}>
                                {
                                    //<img className="img-thumbnail mb-3" src={`https://localhost:5001/api/attachmentfiles/file/${x.id_attachment_for_eye_catch}`} alt="" width="480" height="270" loading="lazy"></img>
                                }
                                <h3 >{x.title}</h3>
                            </Link>
                            <p >{x.id}</p>
                        </div>
                    </div>
                

            )) }
        </>
        </Container>

        
    )
})