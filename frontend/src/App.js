import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import LoginForm from './components/LandingPage/LoginForm';
import SignUpForm from './components/LandingPage/SignUpForm';
import NavBar from './components/NavBar/NavBar';
import Boards from './components/boards';
import OneBoard from './components/boards/oneboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashBoard from './components/boards/dashboard';
import UsersList from './components/UsersList';
import User from './components/User';
import LandingPage from './components/LandingPage/LandingPage'
import { authenticate } from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user)

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      { sessionUser &&  (<NavBar />)}
      <Switch>
        <Route path='/login' exact={true}>
          <LoginForm />
        </Route>
        <Route path='/sign-up' exact={true}>
          <SignUpForm />
        </Route>
        <Route path='/home'>
          <LandingPage />
        </Route>
        {/* <ProtectedRoute path='/users' exact={true} >
          <UsersList />
        </ProtectedRoute>
        <ProtectedRoute path='/users/:userId' exact={true} >
          <User />
        </ProtectedRoute> */}
        <ProtectedRoute path='/' exact={true} >
          {sessionUser ? <Redirect to='/boards' /> : <Redirect to='/home' />}
        </ProtectedRoute>
        <ProtectedRoute path='/boards' exact={true}>
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute path='/boards/new' exact={true}>
          <Boards />
        </ProtectedRoute>
        <ProtectedRoute path={`/boards/:board_id`} exact={true}>
          <OneBoard />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
