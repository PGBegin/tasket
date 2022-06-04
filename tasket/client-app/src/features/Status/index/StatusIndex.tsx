import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';

export default observer(function StatusIndex() {      
    
    const {statusStore} = useStore();
    const {loadStatuses, statusRegistry, isLoadingFinished} = statusStore;
  
    useEffect(() => {
        if(statusRegistry.size <= 1) loadStatuses().then(()=>{
        });

        
    },[statusRegistry.size, loadStatuses])
  
  
    if(!isLoadingFinished) return <LoadingComponent content='Loading Status...' />



    return(
        <Container>
        <>


            <Link to={`/createStatus`}>
                Create Status
            </Link>

            <hr />


            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { 
                        Array.from(statusRegistry.values()).map(status=>(
                            <tr key={status.status}>
                                <td>{status.status}</td>
                                <td>
                                        <Link to={`/editstatus/${status.status}`}>
                                            {status.title}
                                        </Link>
                                </td>
                            </tr> 
                    )) }
                </tbody>
            </Table>
        </>
        </Container>

        
    )
})