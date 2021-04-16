import { Radio, Form } from 'antd';
import CodeEditorContext from 'contexts/codeEditorContext';
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

  const handleChange = () => {
    const _options = { ...form.getFieldsValue() };
    delete _options.theme;
    updateOptions(_options);
  };
  return (
    <>
      <Form
        labelAlign="left"
        {...layout}
        colon={false}
        initialValues={{
          theme: 'light',
          wordWrap: 'off',
          fontSize: '14px',
          tabSize: 2,
          intellisense: true,
        }}
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
            value={theme}
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
            value={options.wordWrap}
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
            value={options.fontSize}
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
            value={options.tabSize}
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
            value={options.intellisense}
            size="small"
            onChange={handleChange}
            optionType="button"
            buttonStyle="solid"
          />
        </Form.Item>
      </Form>
    </>
  );
};

export default SettingMenu;
