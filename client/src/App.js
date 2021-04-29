import React from 'react';
import MainRouter from 'routes/routes';
import { Router } from 'react-router';
import { history } from 'utils';
import { ThemeProvider } from 'styled-components';
import { HelmetProvider } from 'react-helmet-async';
import GlobalStyles from 'styles/global.style';
import theme from 'theme';
import 'styles/App.less';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from 'components/ErrorFallback';

const App = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Router history={history}>
          <HelmetProvider>
            <ErrorBoundary FallbackComponent={ErrorFallback}>
              <GlobalStyles />
              <MainRouter />
            </ErrorBoundary>
          </HelmetProvider>
        </Router>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default App;
