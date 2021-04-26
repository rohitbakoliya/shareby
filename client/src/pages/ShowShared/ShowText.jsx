import { Col, Row } from 'antd';
import RichTextEditor from 'components/RichTextEditor';
import RichTextSharedOptions from 'components/SharedOptions/TextShared';
import { BGWrapper } from 'pages/RichEditor/index.style';
import { useState } from 'react';

const ShowText = ({ data }) => {
  const [blocks, setBlocks] = useState(JSON.parse(data.body));
  const addBlocks = (_, data) => {
    setBlocks(data.blocks);
  };
  return (
    <BGWrapper>
      <Row wrap={false} className="main-content">
        <Col flex="1" className="main-content--col">
          <RichTextEditor readOnly blocks={blocks} addBlocks={addBlocks} />
        </Col>
        <Col flex="400px" className="main-content--col">
          <RichTextSharedOptions data={data} />
        </Col>
      </Row>
    </BGWrapper>
  );
};

export default ShowText;
