import React, { useEffect } from 'react';
//import { Container } from 'semantic-ui-react';
import { Container } from 'react-bootstrap';
import NavBar from './NavBar';
import { observer } from 'mobx-react-lite';
import { Route, Switch, useLocation } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import TestErrors from '../../features/errors/TestError';
import { ToastContainer } from 'react-toastify';
import NotFound from '../../features/errors/NotFound';
import ServerError from '../../features/errors/ServerError';
import LoginForm from '../../features/users/LoginForm';
import { useStore } from '../stores/store';
import LoadingComponent from './LoadingComponents';
import ModalContainer from '../common/modals/ModalContainer';
import ArticleDashboard from '../../features/Articles/dashboard/ArticleDashboard';
import ArticleDetails from '../../features/Articles/details/ArticleDetails';

function App() {
  const location = useLocation();
  const {commonStore, userStore} = useStore();

  useEffect(() => {
    if(commonStore.token){
      userStore.getUser().finally(()=> commonStore.setAppLoaded());

    } else {
      commonStore.setAppLoaded();
    }
  }, [commonStore, userStore])

  if(!commonStore.appLoaded) return <LoadingComponent content='Loading app ...' />

  return (
    <>
      <ToastContainer position ='bottom-right' hideProgressBar />
      <ModalContainer />
      <Route
        //path={'/(.+)'}        
        render={() => (
          <>          
            <NavBar />
            <Container style = {{marginTop: '7em'}}>
              <Switch>
                <Route exact path = '/' component={ArticleDashboard} />       
                <Route path = '/articles' component={ArticleDashboard} />
                <Route path = '/article/:id' component={ArticleDetails} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route component={NotFound} />
              </Switch>
            </Container>    
          </>
        )}
      />
    </>
  );
}

export default observer(App);
