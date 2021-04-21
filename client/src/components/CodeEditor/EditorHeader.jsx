import { Select, Col, Row, Tooltip, Divider } from 'antd';
import { FullscreenOutlined, ForkOutlined } from '@ant-design/icons';
import { languages } from './config';
import Settings from './settings/Settings';
import { useContext } from 'react';
import LangValContext from 'contexts/langValContext';
import CodeEditorContext from 'contexts/codeEditorContext';
import { useHistory } from 'react-router-dom';
import { noop } from 'utils';
import { EyeIcon, EditCodeIcon } from 'components/CustomIcons';
import { EditorHeaderWrapper } from './Editor.style';

const EditorHeader = ({ activeTab, handleActiveTab }) => {
  const history = useHistory();
  const { language, code, handleLangChange } = useContext(LangValContext);
  const {
    es: {
      options: { readOnly },
    },
  } = useContext(CodeEditorContext);

  const handleFullScreen = () => {
    const element = document.getElementById('code--container');
    if (element && document.fullscreenEnabled) {
      element.requestFullscreen();
    }
  };

  const handlForkPaste = () => {
    history.push('/', { language, code });
  };

  return (
    <EditorHeaderWrapper>
      <Row align="middle" justify="space-between">
        <Col>
          <Row justify="space-between" align="stretch">
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
            {language.name === 'markdown' && (
              <>
                <Col
                  onClick={() => handleActiveTab(0)}
                  className={`tab--col-md ${activeTab === 0 && 'active'}`}
                >
                  <EditCodeIcon style={{ fontSize: '22px' }} />
                  <span className="text-span">Edit</span>
                </Col>
                <Col
                  onClick={() => handleActiveTab(1)}
                  className={`tab--col-md ${activeTab === 1 && 'active'}`}
                >
                  <EyeIcon style={{ fontSize: '22px' }} />
                  <span className="text-span">Preview</span>
                </Col>
              </>
            )}
          </Row>
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
    </EditorHeaderWrapper>
  );
};
export default EditorHeader;
