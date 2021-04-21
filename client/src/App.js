import React from 'react';
import MainRouter from 'routes/routes';
import { Router } from 'react-router';
import { history } from 'utils';
import 'styles/App.css';
import GlobalStyles from 'styles/global.style';

const App = () => {
  return (
    <React.Fragment>
      <Router history={history}>
        <GlobalStyles />
        <MainRouter />
      </Router>
    </React.Fragment>
  );
};

export default App;
