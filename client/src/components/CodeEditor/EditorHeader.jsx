import { Select, Col, Row, Tooltip, Divider, Button } from 'antd';
import { FullscreenOutlined, ForkOutlined } from '@ant-design/icons';
import { execLanguagesMapper, languages } from './config';
import Settings from './settings/Settings';
import { useContext, useState } from 'react';
import LangValContext from 'contexts/langValContext';
import CodeEditorContext from 'contexts/codeEditorContext';
import { useHistory } from 'react-router-dom';
import { http, noop } from 'utils';
import { EyeIcon, EditCodeIcon } from 'components/CustomIcons';
import { EditorHeaderWrapper } from './Editor.style';
import RunModal from './execute/RunModal';
import OutputModal from './execute/OutputModal';

const EditorHeader = ({ activeTab, handleActiveTab }) => {
  const history = useHistory();
  const { language, codes, handleLangChange } = useContext(LangValContext);
  const {
    es: {
      theme,
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
    history.push('/', { language, code: codes[language.id] });
  };

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleO, setIsModalVisibleO] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [output, setOutput] = useState({});
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async form => {
    setConfirmLoading(true);
    const body = form.getFieldsValue();
    body.source = codes[language.id];
    body.lang = execLanguagesMapper[language.name];
    try {
      const { data } = await http.post('/api/submissions/', body);
      setTimeout(async () => {
        const { data: subdata } = await http.get(`/api/submissions/${data.he_id}`);
        console.log(subdata);
        setOutput(subdata);
        setConfirmLoading(false);
        setIsModalVisibleO(true);
      }, 3500);
    } catch (err) {
      console.log(err);
      setConfirmLoading(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  return (
    <EditorHeaderWrapper th={theme}>
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
            {/* // TODO: */}
            {execLanguagesMapper[language.name] && (
              <Col className="run__btn">
                <Button type="primary" onClick={showModal}>
                  Run
                </Button>
                <RunModal
                  handleOk={handleOk}
                  handleCancel={handleCancel}
                  isModalVisible={isModalVisible}
                  confirmLoading={confirmLoading}
                />
                <OutputModal
                  handleOk={() => setIsModalVisibleO(false)}
                  handleCancel={() => setIsModalVisibleO(false)}
                  isModalVisibleO={isModalVisibleO}
                  output={output}
                />
              </Col>
            )}
            {language.name === 'markdown' && (
              <>
                <Col
                  onClick={() => handleActiveTab(0)}
                  className={`tab--col-md ${activeTab === 0 && 'active'}`}
                >
                  <EditCodeIcon style={{ fontSize: '18px' }} />
                  <span className="text-span">Edit</span>
                </Col>
                <Col
                  onClick={() => handleActiveTab(1)}
                  className={`tab--col-md ${activeTab === 1 && 'active'}`}
                >
                  <EyeIcon style={{ fontSize: '18px' }} />
                  <span className="text-span">Preview</span>
                </Col>
              </>
            )}
          </Row>
        </Col>
        <Col>
          <Row justify="space-between" align="stretch" className="header-options">
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
