import { Select, Col, Row, Tooltip } from 'antd';
import { FullscreenOutlined } from '@ant-design/icons';
import { languages } from './config';
import styled from 'styled-components';
import Settings from './settings/Settings';

const HeaderWrapper = styled.div`
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  span {
    margin-right: 8px;
  }
`;

const EditorHeader = ({ setLanguage, language }) => {
  const handleLangChange = lang => setLanguage(lang);

  const handleFullScreen = () => {
    const element = document.getElementById('code--container');
    if (document.fullscreenEnabled) {
      element.requestFullscreen();
    }
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
            value={language}
            style={{ width: 180 }}
            onChange={handleLangChange}
          >
            {languages.map(lang => (
              <Select.Option key={lang.name}>{lang.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col>
          <Tooltip title="fullscreen mode">
            <FullscreenOutlined
              onClick={handleFullScreen}
              style={{ fontSize: '22px', marginRight: '12px' }}
            />
          </Tooltip>
          <Settings />
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
export default EditorHeader;
