import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
//import { Grid, GridColumn } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponents';
import { useStore } from '../../../app/stores/store';
import ArticleList from './ArticleList';

export default observer(function ArticleDashboard() {      
    
    const {articleStore} = useStore();
    const {loadArticles, articleRegistry} = articleStore;
  
    useEffect(() => {
        if(articleRegistry.size <= 1) loadArticles();
    },[articleRegistry.size, loadArticles])
  
  
    if(articleStore.loadingInitial) return <LoadingComponent content='Loading articles...' />



    return(
        <Container>
            <ArticleList />
        </Container>

        
    )
})