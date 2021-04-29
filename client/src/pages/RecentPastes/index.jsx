import { message } from 'antd';
import SEO from 'components/SEO';
import Layout from 'layouts/Root';
import { useEffect, useState } from 'react';
import { http } from 'utils';
import { RecentPasteWrapper } from './index.style';
import PastesTable from './PasteTable';

const RecentPastes = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data } = await http.get(`/api/pastes/recents`);
        setList(data);
      } catch (err) {
        message.error({ content: err.data.error, duration: 3 });
      } finally {
        setLoading(false);
      }
    };
    fetchRecent();
  }, []);

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
