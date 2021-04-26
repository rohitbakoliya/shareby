import React from 'react';
import MainRouter from 'routes/routes';
import { Router } from 'react-router';
import { history } from 'utils';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from 'styles/global.style';
import theme from 'theme';
import 'styles/App.less';

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <GlobalStyles />
          <MainRouter />
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
