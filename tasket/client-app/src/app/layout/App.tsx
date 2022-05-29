import React, { useEffect } from 'react';
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
import TaskIndex from '../../features/Tasks/index/TaskIndex';
import TaskForm from '../../features/Tasks/form/TaskForm';
import TaskDetails from '../../features/Tasks/details/TaskDetails';
import RegisterForm from '../../features/users/RegisterForm';

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
                <Route exact path = '/' component={HomePage} />
                <Route path = '/tasks' component={TaskIndex} />
                <Route path = '/task/:id' component={TaskDetails} />
                <Route key = {location.key} path = {['/createTask', '/edittask/:id']} component={TaskForm} />
                <Route path='/errors' component={TestErrors} />
                <Route path='/server-error' component={ServerError} />
                <Route path='/login' component={LoginForm} />
                <Route path='/register' component={RegisterForm} />
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
