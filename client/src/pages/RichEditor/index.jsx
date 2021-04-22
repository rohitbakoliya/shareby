import Layout from 'layout';
import { Row, Col } from 'antd';
import EditorJs from 'react-editor-js';
import { BGWrapper } from './index.style';
import { RichEditorWrapper } from './index.style';
import { EDITOR_JS_TOOLS } from './tools';
import { RichEditorInner } from './index.style';

const RichEditor = () => {
  const handleChange = (abc, newData) => {
    console.log(abc, newData);
  };
  return (
    <Layout>
      <BGWrapper>
        <Row wrap={false} className="main-content">
          <Col flex="1" className="main-content--col">
            <RichEditorWrapper>
              <RichEditorInner>
                <EditorJs data={{}} onChange={handleChange} tools={EDITOR_JS_TOOLS} />
              </RichEditorInner>
            </RichEditorWrapper>
          </Col>
          <Col flex="400px" className="main-content--col"></Col>
        </Row>
      </BGWrapper>
    </Layout>
  );
};
export default RichEditor;
