import React from 'react';
import MainRouter from 'routes/routes';
import { Router } from 'react-router';
import { history } from 'utils';
import 'styles/App.css';

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <MainRouter />
      </Router>
    </React.Fragment>
  );
};

export default App;
