import Layout from 'layout/Root';
import ErrorHandler from 'components/ErrorHandler';

const NotFound = () => {
  return (
    <Layout>
      <ErrorHandler
        status={404}
        statusText="Page Not Found"
        error="Sorry, the page you visited does not exist."
      />
    </Layout>
  );
};
export default NotFound;
