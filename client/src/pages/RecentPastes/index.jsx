import Layout from 'layout';
import { useEffect, useState } from 'react';
import { http } from 'utils';
import { RecentPasteWrapper } from './index.style';
import PastesTable from './PasteTable';

const RecentPastes = () => {
  const [list, setList] = useState([]);
  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const { data } = await http.get(`/api/pastes/recents`);
        setList(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRecent();
  }, []);
  console.log(list);
  return (
    <Layout>
      <RecentPasteWrapper>
        <PastesTable data={list} />
      </RecentPasteWrapper>
    </Layout>
  );
};

export default RecentPastes;
