import { message } from 'antd';
import UnlockPasteForm from 'components/Forms/UnlockPasteForm';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { http } from 'utils';
import ShowCode from './ShowCode';
import ShowText from './ShowText';

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
    return pasteData.type === 'code' ? (
      <ShowCode data={pasteData} />
    ) : (
      <ShowText data={pasteData} />
    );
  }
  return (
    <ShowProtectedWrapper>
      <UnlockPasteForm onFinish={onFinish} url={url} isLoading={isLoading} />
    </ShowProtectedWrapper>
  );
};

export default ShowProtected;
