import { Radio, Form, Button, Col, Row } from 'antd';
import CodeEditorContext from 'contexts/codeEditorContext';
import LangValContext from 'contexts/langValContext';
import { useContext } from 'react';

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const SettingMenu = () => {
  const [form] = Form.useForm();
  const {
    es: { theme, options },
    toggleTheme,
    updateOptions,
  } = useContext(CodeEditorContext);
  const { code, language } = useContext(LangValContext);

  const handleChange = () => {
    const _options = { ...form.getFieldsValue() };
    delete _options.theme;
    updateOptions(_options);
  };

  const setFavLang = () => {
    let favLang = localStorage.getItem('favLanguage');
    favLang = JSON.stringify(language);
    localStorage.setItem('favLanguage', favLang);
  };

  const setDefaultTemplate = () => {
    let temp = localStorage.getItem('defaultTemplates');
    temp = JSON.parse(temp);
    if (temp) {
      temp[language.id] = code;
      temp = JSON.stringify(temp);
      localStorage.setItem('defaultTemplates', temp);
    } else {
      let templates = {};
      templates[language.id] = code;
      templates = JSON.stringify(templates);
      localStorage.setItem('defaultTemplates', templates);
    }
  };

  const saveOptions = () => {
    const _options = { ...form.getFieldsValue() };
    const editorTheme = _options.theme;
    delete _options.theme;

    let favOptions = localStorage.getItem('favOptions');
    favOptions = JSON.parse(favOptions);
    if (favOptions) {
      favOptions = { ...favOptions, ..._options };
      favOptions = JSON.stringify(favOptions);
      localStorage.setItem('favOptions', favOptions);
    } else {
      localStorage.setItem('favOptions', JSON.stringify(_options));
    }

    // saving theme as well
    localStorage.setItem('editorTheme', editorTheme);
  };

  const resetAll = () => {
    localStorage.clear();
  };
  return (
    <>
      <Form
        labelAlign="left"
        {...layout}
        initialValues={{ ...options, theme }}
        colon={false}
        form={form}
      >
        <Form.Item label="Theme" name="theme">
          <Radio.Group
            options={[
              {
                label: 'Light',
                value: 'light',
              },
              {
                label: 'Dark',
                value: 'vs-dark',
              },
            ]}
            size="small"
            onChange={toggleTheme}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item label="Word Wrap" name="wordWrap">
          <Radio.Group
            options={[
              {
                label: 'On',
                value: 'on',
              },
              {
                label: 'Off',
                value: 'off',
              },
            ]}
            size="small"
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item label="Font Size" name="fontSize">
          <Radio.Group
            options={[
              {
                label: 'Small',
                value: '14px',
              },
              {
                label: 'Medium',
                value: '17px',
              },
              {
                label: 'Large',
                value: '20px',
              },
            ]}
            size="small"
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item label="Tab Size" name="tabSize">
          <Radio.Group
            style={{ width: '300px' }}
            options={[
              {
                label: '2 spaces',
                value: 2,
              },
              {
                label: '4 spaces',
                value: 4,
              },
              {
                label: '8 spaces',
                value: 8,
              },
            ]}
            size="small"
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
        <Form.Item name="intellisense" label={'Intellisense'}>
          <Radio.Group
            options={[
              {
                label: 'Enable',
                value: true,
              },
              {
                label: 'Disable',
                value: false,
              },
            ]}
            size="small"
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
      <Row>
        <Col flex="1">
          <Button block type="dashed" onClick={setFavLang}>
            set {language.name} as favorite
          </Button>
        </Col>
        <Col flex="1">
          <Button block type="dashed" onClick={setDefaultTemplate}>
            set as default template
          </Button>
        </Col>
      </Row>
      <br />
      <Button block type="dashed" onClick={saveOptions}>
        save editor options
      </Button>
      <br />
      <br />
      <Button block type="text" danger onClick={resetAll}>
        reset all to defaults
      </Button>
    </>
  );
};

export default SettingMenu;
