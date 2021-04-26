import { Button, Card, Form, Input, Typography } from 'antd';
import { pasteURL } from 'utils';
import PropTypes from 'prop-types';

const UnlockPasteForm = ({ isLoading, url, onFinish }) => (
  <Card
    title={
      <Typography.Title
        level={4}
        copyable={{
          text: pasteURL(url),
          tooltips: ['Copy paste URL to clipboard', 'Copied!'],
        }}
      >
        Locked Paste
      </Typography.Title>
    }
  >
    <Form onFinish={onFinish}>
      <Form.Item
        label="Password"
        name="password"
        required
        rules={[{ required: true, type: 'string', min: 4, max: 10 }]}
      >
        <Input.Password />
      </Form.Item>
      <br />
      <Form.Item style={{ textAlign: 'center' }}>
        <Button loading={isLoading} type="primary" htmlType="submit">
          Unlock Paste
        </Button>
      </Form.Item>
    </Form>
  </Card>
);

UnlockPasteForm.propTypes = {
  onFinish: PropTypes.func.isRequired,
  url: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default UnlockPasteForm;
