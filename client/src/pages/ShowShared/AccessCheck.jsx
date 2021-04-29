import { useEffect, useState } from 'react';
import { Row, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import { http } from 'utils';
import ShowCode from './ShowCode';
import ShowText from './ShowText';
import ShowProtected from './ShowProtected';
import { useErrorHandler } from 'react-error-boundary';

const AccessCheck = () => {
  const { url } = useParams();
  const [access, setAccess] = useState();
  const [pasteData, setPasteData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const errorHandler = useErrorHandler();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { access: _access },
        } = await http.get(`/api/pastes/${url}/access`);
        setAccess(_access);
        if (_access === 'public') {
          const { data } = await http.get(`/api/pastes/${url}`);
          setPasteData(data);
          setIsLoading(false);
        } else {
          setIsLoading(false);
        }
      } catch (err) {
        errorHandler(err);
      }
    };
    !access && fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [access, url]);

  if (isLoading) {
    return (
      <Row justify="center" align="middle">
        <Spin tip={'Finding paste...'} size="large" />
      </Row>
    );
  }

  if (access === 'private') return <>Private Paste </>;
  else if (access === 'protected') return <ShowProtected url={url} />;

  // for public pastes
  return pasteData.type === 'code' ? <ShowCode data={pasteData} /> : <ShowText data={pasteData} />;
};

export default AccessCheck;
