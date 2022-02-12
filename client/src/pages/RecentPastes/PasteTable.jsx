import { Table } from 'antd';
import { languages } from 'components/CodeEditor/config';
import moment from 'moment';
import { Link } from 'react-router-dom';
import ReactTimeago from 'react-timeago';

const columns = [
  {
    title: 'Title',
    dataIndex: 'title',
    ellipsis: true,
  },
  {
    title: 'Language',
    dataIndex: 'language',
    filters: [
      ...Array.from(languages).map(lang => ({ value: lang.name, text: lang.name })),
      { value: 'richtext', text: 'richtext' },
    ].sort((a, b) => a.value.localeCompare(b.value)),
    onFilter: (value, record) => value === record.language,
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    defaultSortOrder: 'ascend',
    sorter: (a, b) => moment(b).isSameOrAfter(a),
    render: createdAt => <ReactTimeago date={createdAt} />,
  },
  {
    title: 'Action',
    dataIndex: 'url',
    render: url => <Link to={`/${url}`}>view share</Link>,
  },
];

const PastesTable = ({ data, loading }) => (
  <Table
    loading={loading}
    rowKey={'url'}
    pagination={{ position: ['topRight'] }}
    dataSource={data}
    columns={columns}
  />
);
export default PastesTable;
