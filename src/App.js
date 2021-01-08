import React from 'react';
import { Dashboard, Login, PrivateRoute, AuthWrapper, Error } from './pages';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <h2>test Continuation integration</h2>
      <Dashboard></Dashboard>
      <Login />
      <Error />
    </div>
  );
}

export default App;
