import { useEffect, useState } from 'react';
import { Row, Spin, message } from 'antd';
import { useParams } from 'react-router-dom';
import { http } from 'utils';
import ShowPublic from './ShowPublic';

const AccessCheck = () => {
  const { url } = useParams();
  const [access, setAccess] = useState();
  const [pasteData, setPasteData] = useState();
  const [isLoading, setIsLoading] = useState(true);
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
        message.error({ content: err, duration: 3 });
        setIsLoading(false);
      }
    };
    !access && fetchData();
  }, [access, url]);

  if (isLoading) {
    return (
      <Row justify="center" align="middle">
        <Spin tip={'Finding paste...'} size="large" />
      </Row>
    );
  }
  if (access !== 'public') {
    return <>you don't have access to view this</>;
  }

  // for public pastes
  return <ShowPublic data={pasteData} />;
};

export default AccessCheck;
