import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  FileMarkdownOutlined,
  FilePdfOutlined,
  ForkOutlined,
  LockOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import { pasteURL, upperFirst } from 'utils';
import { SharedOptionsWrapper } from './Options.style';
import TimeAgo from 'react-timeago';
import FileSaver from 'file-saver';
import { useHistory } from 'react-router-dom';

const TextShared = ({ data }) => {
  const history = useHistory();
  const handleFork = () => {
    history.push(`/r`, data.body);
  };

  const downloadHtml = () => {
    const blob = new Blob([data.body], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `${data.url}.html`);
  };

  const downloadPdf = () => {};
  const downloadMd = () => {};
  return (
    <SharedOptionsWrapper>
      <Typography.Title level={3}>Paste Details</Typography.Title>
      <div className="options--content">
        <Card
          bordered={false}
          loading={!data}
          actions={[
            <Tooltip title="fork file" placement="bottom">
              <ForkOutlined key="fork" onClick={handleFork} />
            </Tooltip>,
            <Tooltip title="download html" placement="bottom">
              <DownloadOutlined key="download html" onClick={downloadHtml} />
            </Tooltip>,
            <Tooltip title="download pdf" placement="bottom">
              <FilePdfOutlined key="download pdf" onClick={downloadPdf} />
            </Tooltip>,
            <Tooltip title="download markdown" placement="bottom">
              <FileMarkdownOutlined key="download markdown" onClick={downloadMd} />
            </Tooltip>,
          ]}
        >
          <Card.Meta
            title={
              <Typography.Text
                copyable={{
                  text: pasteURL(data.url),
                  tooltips: ['Copy paste URL to clipboard', 'Copied!'],
                }}
              >
                {data.title}
              </Typography.Text>
            }
            description={`By a guest user`}
          />
          <Row gutter={[16, 16]} style={{ marginTop: '25px' }}>
            <Col span={6}>
              <CalendarOutlined title="created at" />
            </Col>
            <Col span={18}>
              <TimeAgo date={data.createdAt} />
            </Col>
            <Col span={6}>
              <ClockCircleOutlined title="expiretion" />
            </Col>
            <Col span={18}>{data.expireAt ? <TimeAgo date={data.expireAt} /> : 'Never'}</Col>
            <Col span={6} title="access">
              <LockOutlined />
            </Col>
            <Col span={18}>{upperFirst(data.access)}</Col>
          </Row>
        </Card>
      </div>
    </SharedOptionsWrapper>
  );
};

export default TextShared;
