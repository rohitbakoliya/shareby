import { Row, Col } from 'antd';
import Editor from 'components/CodeEditor';
import Options from 'components/Options/Options';
import Layout from 'layout';
import { IndexWrapper } from './index.style';

const IndexPage = () => {
  return (
    <Layout>
      <IndexWrapper>
        <Row wrap={false} className="main-content">
          <Col flex="auto" className="main-content--col">
            <Editor />
          </Col>
          <Col flex="400px" className="main-content--col">
            <Options />
          </Col>
        </Row>
      </IndexWrapper>
    </Layout>
  );
};

export default IndexPage;
