import Layout from 'layouts/Root';
import { useEffect } from 'react';
import styled from 'styled-components';
import ErrorHandler from './ErrorHandler';

const ErrorWrapper = styled.div`
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const errorDefault = {
  status: 'error',
  statusText: 'Ohh! Something crazy happend',
  data: {
    error: `It seems like this error is from our end. Please raise an issue if the problem persists.`,
    issueLink: `https://github.com/rohitbakoliya/shareby/issues/new`,
  },
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  if (error instanceof Error) {
    error = errorDefault;
  }
  const clickListener = () => {
    document.addEventListener('click', e => {
      if (e.target.closest('.home__btn') || e.target.tagName === 'A') {
        resetErrorBoundary();
      }
    });
  };
  useEffect(() => {
    clickListener();
    return () => {
      document.removeEventListener('click', clickListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Layout>
      <ErrorWrapper>
        <ErrorHandler {...error} />
      </ErrorWrapper>
    </Layout>
  );
};

export default ErrorFallback;
