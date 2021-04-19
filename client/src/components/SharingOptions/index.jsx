import { Typography, Form, Input, Select, Checkbox, Button, message } from 'antd';
import LangValContext from 'contexts/langValContext';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { http } from 'utils';
import { expirationList } from './config';

const OptionsWrapper = styled.div`
  height: 100%;
  .ant-typography {
    text-align: center;
  }
  form {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;
const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};
const centerLayout = {
  wrapperCol: { offset: 6, span: 18 },
};

const Options = () => {
  const history = useHistory();

  const [checked, setChecked] = useState(false);
  const { code, language } = useContext(LangValContext);

  // to create new paste
  const onFinish = async values => {
    const key = 'pasteCreator';
    message.loading({ content: 'Creating paste...', key });
    const { expireAfterSeconds } = values;
    let paste = { ...values };
    delete paste.expireAfterSeconds;
    if (!paste.password) {
      delete paste.password;
      paste.access = 'public';
    } else {
      paste.access = 'protected';
    }
    if (expireAfterSeconds !== -1) {
      paste.expireAt = new Date(Date.now() + expireAfterSeconds).toISOString();
    }
    paste.body = code;
    paste.language = language.name;
    try {
      const { data } = await http.post('/api/pastes', paste);
      message.success({ content: 'New Paste created 🎉', key, duration: 4 });
      console.log(data);
      history.push(`/${data.url}`);
    } catch (err) {
      message.error({ content: err.data.error, key, duration: 3 });
    }
  };
  return (
    <OptionsWrapper>
      <Typography.Title level={3}>Sharing Settings</Typography.Title>
      <Form
        {...layout}
        onFinish={onFinish}
        initialValues={{ expireAfterSeconds: -1 }}
        name="options"
        labelAlign="left"
      >
        <Form.Item label="Expiration Time" name="expireAfterSeconds">
          <Select>
            {expirationList.map(exp => (
              <Select.Option key={exp.name} value={exp.ms}>
                {exp.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Password">
          <Checkbox onChange={() => setChecked(!checked)} checked={checked}>
            {checked ? 'Disabled' : 'Enabled'}
          </Checkbox>
        </Form.Item>
        {checked && (
          <Form.Item
            {...tailLayout}
            name="password"
            rules={[
              {
                required: true,
                type: 'string',
                max: 10,
                min: 4,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
        )}
        <Form.Item label="Title/Name" name="title">
          <Input />
        </Form.Item>
        <Form.Item {...centerLayout}>
          <Button type="primary" htmlType="submit">
            Create New Paste
          </Button>
        </Form.Item>
      </Form>
    </OptionsWrapper>
  );
};

export default Options;
