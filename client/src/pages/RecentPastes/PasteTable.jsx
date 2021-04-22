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
    filters: Array.from(languages).map(lang => ({ value: lang.name, text: lang.name })),
    onFilter: (value, record) => value === record.language,
  },
  {
    title: 'Created',
    dataIndex: 'createdAt',
    defaultSortOrder: 'descend',
    sorter: (a, b) => moment(a).isSameOrAfter(b),
    render: createdAt => <ReactTimeago date={createdAt} />,
  },
  {
    title: 'Action',
    dataIndex: 'url',
    render: url => <Link to={`/${url}`}>view paste</Link>,
  },
];

const PastesTable = ({ data }) => (
  <Table
    rowKey={row => row._id}
    pagination={{ position: ['topRight'], hideOnSinglePage: true }}
    dataSource={data}
    columns={columns}
  />
);
export default PastesTable;
