import { Button, Form, Input, Card, Typography, message } from 'antd';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { http, pasteURL } from 'utils';
import ShowSharedPaste from './ShowSharedPaste';

const ShowProtectedWrapper = styled.div`
  height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .ant-card {
    min-width: 500px;
  }
`;

const ShowProtected = ({ url }) => {
  const { state: routerState } = useLocation();
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);
  const [pasteData, setPasteData] = useState();

  /**
   * paste data is stored in history state 😁
   * so no need to enter password again after every refresh
   */
  useEffect(() => {
    if (routerState) {
      setPasteData(routerState);
    }
  }, [routerState]);

  const onFinish = async values => {
    setIsLoading(true);
    try {
      const { data } = await http.post(`/api/pastes/${url}`, values);
      history.replace(`/${url}`, data);
      setPasteData(data);
      setIsLoading(false);
    } catch (err) {
      message.error({ content: err.data.error, duration: 3 });
      setIsLoading(false);
    }
  };
  if (pasteData) {
    return <ShowSharedPaste data={pasteData} />;
  }
  return (
    <ShowProtectedWrapper>
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
    </ShowProtectedWrapper>
  );
};

export default ShowProtected;
