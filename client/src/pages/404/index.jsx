import Layout from 'layouts/Root';
import ErrorHandler from 'components/ErrorHandler';

const NotFound = () => {
  return (
    <Layout>
      <ErrorHandler
        status={404}
        statusText="Page Not Found"
        error="Sorry, the page you are looking for does not exist or is no longer available"
      />
    </Layout>
  );
};
export default NotFound;
