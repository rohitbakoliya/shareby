import SEO from 'components/SEO';
import Layout from 'layouts/Root';
import { useEffect, useState } from 'react';
import { useErrorHandler } from 'react-error-boundary';
import { http } from 'utils';
import { RecentPasteWrapper } from './index.style';
import PastesTable from './PasteTable';

const RecentPastes = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  const handleError = useErrorHandler();

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data } = await http.get(`/api/pastes/recents`);
        setList(data);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        handleError(err);
      }
    };
    fetchRecent();
  }, [handleError]);

  return (
    <Layout>
      <SEO title="Recent shares" />
      <RecentPasteWrapper isEmpty={!loading && list.length === 0}>
        <PastesTable data={list} loading={loading} />
      </RecentPasteWrapper>
    </Layout>
  );
};

export default RecentPastes;
