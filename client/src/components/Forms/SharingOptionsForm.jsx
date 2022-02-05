import { Button, Form, Input, Select } from 'antd';
import Checkbox from 'antd/lib/checkbox/Checkbox';
import { expirationList } from 'config/expirationList';
import PropTypes from 'prop-types';

const layout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 15 },
};
const tailLayout = {
  wrapperCol: { offset: 7, span: 15 },
};
const centerLayout = {
  wrapperCol: { offset: 7, span: 17 },
};

const SharingOptionsForm = ({ onFinish, checked, setChecked }) => {
  return (
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
          Create New Share
        </Button>
      </Form.Item>
    </Form>
  );
};

SharingOptionsForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  checked: PropTypes.any.isRequired,
  setChecked: PropTypes.any.isRequired,
};

export default SharingOptionsForm;
