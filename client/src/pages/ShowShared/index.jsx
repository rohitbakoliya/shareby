import Layout from 'layout/Root';
import { ShowSharedWrapper } from './index.style';
import AccessCheck from './AccessCheck';

const ShowShared = () => {
  return (
    <>
      <Layout>
        <ShowSharedWrapper>
          <AccessCheck />
        </ShowSharedWrapper>
      </Layout>
    </>
  );
};

export default ShowShared;
