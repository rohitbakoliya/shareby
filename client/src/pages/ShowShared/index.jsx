import Layout from 'layout';
import { useParams } from 'react-router-dom';

const ShowShared = () => {
  const { url } = useParams();

  return (
    <>
      <Layout>
        <div>url: {url}</div>
      </Layout>
    </>
  );
};

export default ShowShared;
