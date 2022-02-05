import { Button, Card, Form, Input, Typography } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { shareURL } from 'utils';
import PropTypes from 'prop-types';

const UnlockPasteForm = ({ isLoading, url, onFinish }) => (
  <Card
    title={
      <Typography.Title
        level={4}
        copyable={{
          text: shareURL(url),
          tooltips: ['Copy share URL to clipboard', 'Copied!'],
          icon: <LinkOutlined />,
        }}
      >
        Locked Share
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
          Unlock Share
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
