import { Typography, Form, Input, Select, Checkbox, Button } from 'antd';
import LangValContext from 'contexts/langValContext';
import { useContext, useState } from 'react';
import styled from 'styled-components';
import { expirationList } from './config';

const OptionsWrapper = styled.div`
  .ant-typography {
    text-align: center;
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
  const [checked, setChecked] = useState(false);
  const { code, language } = useContext(LangValContext);

  // to create new paste
  const onFinish = values => {
    let paste = { ...values };
    paste.body = code;
    paste.language = language.name;
    console.log(paste);
  };
  return (
    <OptionsWrapper>
      <Typography.Title level={3}>Sharing Settings</Typography.Title>
      <Form
        {...layout}
        onFinish={onFinish}
        initialValues={{ expireAt: -1 }}
        name="options"
        labelAlign="left"
      >
        <Form.Item label="Expiration Time" name="expireAt">
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
