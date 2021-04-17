import { Result, Button } from 'antd';
import Layout from 'layout';
import { useHistory } from 'react-router-dom';

const NotFound = () => {
  const hisory = useHistory();
  const goBack = () => {
    hisory.replace('/');
  };
  return (
    <Layout>
      <Result
        status="404"
        title="Not Found"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button type="link" danger onClick={goBack}>
            Return Home
          </Button>
        }
      />
    </Layout>
  );
};
export default NotFound;
