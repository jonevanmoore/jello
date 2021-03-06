import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from './components/NavBar/NavBar';
import OneBoard from './components/boards/OneBoard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import DashBoard from './components/boards/DashBoard';
import CardPage from './components/Cards/Card';
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
      {sessionUser && (<NavBar />)}
      <Switch>
        <Route path='/home'>
          <LandingPage />
        </Route>
        <ProtectedRoute path='/' exact={true} >
          {sessionUser ? <Redirect to='/boards' /> : <Redirect to='/home' />}
        </ProtectedRoute>
        <ProtectedRoute path='/boards' exact={true}>
          <DashBoard />
        </ProtectedRoute>
        <ProtectedRoute path={`/boards/:board_id`} exact={true}>
          <OneBoard />
        </ProtectedRoute>

        <Route>
          {sessionUser ? <Redirect to='/boards' /> : <Redirect to='/home' />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
