import { Select, Col, Row, Tooltip, Divider } from 'antd';
import { FullscreenOutlined, ForkOutlined } from '@ant-design/icons';
import { languages } from './config';
import styled from 'styled-components';
import Settings from './settings/Settings';
import { useContext } from 'react';
import LangValContext from 'contexts/langValContext';
import CodeEditorContext from 'contexts/codeEditorContext';
import { useHistory } from 'react-router-dom';
import { noop } from 'utils';

const HeaderWrapper = styled.div`
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  span {
    margin-right: 8px;
  }
`;

const EditorHeader = () => {
  const history = useHistory();

  const { language, code, handleLangChange } = useContext(LangValContext);
  const {
    es: {
      options: { readOnly },
    },
  } = useContext(CodeEditorContext);

  const handleFullScreen = () => {
    const element = document.getElementById('code--container');
    if (document.fullscreenEnabled) {
      element.requestFullscreen();
    }
  };

  const handlForkPaste = () => {
    history.push('/', { language, code });
  };
  return (
    <HeaderWrapper>
      <Row align="middle" justify="space-between">
        <Col>
          <span>Language: </span>
          <Select
            showSearch
            placeholder="Select a language"
            optionFilterProp="children"
            value={language.name}
            style={{ width: 180 }}
            onChange={readOnly ? noop : handleLangChange}
          >
            {languages.map(lang => (
              <Select.Option key={lang.name}>{lang.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Row justify="space-between" align="stretch">
            {readOnly && (
              <>
                <Tooltip title="fork paste to edit">
                  <ForkOutlined onClick={handlForkPaste} style={{ fontSize: '22px' }} />
                </Tooltip>
                <Divider
                  type="vertical"
                  style={{ marginLeft: '6px', marginRight: '12px', height: '22px' }}
                />
              </>
            )}
            <Tooltip title="fullscreen mode">
              <FullscreenOutlined onClick={handleFullScreen} style={{ fontSize: '22px' }} />
            </Tooltip>
            <Divider
              type="vertical"
              style={{ marginLeft: '6px', marginRight: '12px', height: '22px' }}
            />
            <Settings />
          </Row>
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
export default EditorHeader;
