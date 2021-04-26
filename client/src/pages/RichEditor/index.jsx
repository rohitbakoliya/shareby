import Layout from 'layout';
import { Row, Col } from 'antd';
import { BGWrapper } from './index.style';
import RichTextSharingOptions from 'components/SharingOptions/TextSharing';
import { useState } from 'react';
import { initialBlocks } from 'components/RichTextEditor/tools';
import RichTextEditor from 'components/RichTextEditor';
import { useLocation } from 'react-router-dom';

const RichEditor = () => {
  const { state: routerState } = useLocation();
  const [blocks, setBlocks] = useState(JSON.parse(routerState) || initialBlocks);

  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };

  return (
    <Layout>
      <BGWrapper>
        <Row wrap={false} className="main-content">
          <Col flex="1" className="main-content--col">
            <RichTextEditor blocks={blocks} addBlocks={addBlocks} />
          </Col>
          <Col flex="400px" className="main-content--col">
            <RichTextSharingOptions blocks={blocks} />
          </Col>
        </Row>
      </BGWrapper>
    </Layout>
  );
};
export default RichEditor;
