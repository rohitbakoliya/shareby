import {
  CalendarOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
  FileMarkdownOutlined,
  ForkOutlined,
  LockOutlined,
  LinkOutlined,
} from '@ant-design/icons';
import { useEffect } from 'react';
import { Card, Col, Row, Tooltip, Typography } from 'antd';
import { htmlParser, mdParser, shareURL, upperFirst } from 'utils';
import { SharedOptionsWrapper } from './Options.style';
import TimeAgo from 'react-timeago';
import FileSaver from 'file-saver';
import { useHistory } from 'react-router-dom';
import { formatter } from './CodeShared';

const TextShared = ({ data }) => {
  const history = useHistory();
  const handleFork = () => {
    history.push(`/r`, data.body);
  };

  // To remove the expired shares
  useEffect(() => {
    if (data && data.expireAt) {
      const timeLeft = new Date(data.expireAt) - new Date().getTime();
      setTimeout(() => {
        history.push('/r');
      }, timeLeft);
    }
  }, [data, history]);

  const downloadHtml = () => {
    const blocks = JSON.parse(data.body);
    const html = htmlParser(blocks, data.title);
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    FileSaver.saveAs(blob, `${data.url}.html`);
  };
  // ! https://github.com/MrRio/jsPDF/issues/3113
  // const downloadPdf = () => {
  //   const blocks = JSON.parse(data.body);
  //   const html = htmlParser(blocks, data.title);
  //   const parser = new DOMParser();
  //   const parsed = parser.parseFromString(html, 'text/html');
  //   const pdf = new jsPDF('p', 'pt', 'a4');
  //   console.log(parsed);
  //   pdf.html(parsed.body.innerHTML, { x: 15, y: 15, filename: `${data.url}`, callback: doc => doc.save() });
  // };

  const downloadMd = () => {
    const blocks = JSON.parse(data.body);
    const md = mdParser(blocks);
    const blob = new Blob([md], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `${data.url}.md`);
  };

  return (
    <SharedOptionsWrapper>
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
            // <Tooltip title="download pdf" placement="bottom">
            //   <FileMarkdownOutlined key="download pdf" onClick={downloadPdf} />
            // </Tooltip>,
            <Tooltip title="download markdown" placement="bottom">
              <FileMarkdownOutlined key="download markdown" onClick={downloadMd} />
            </Tooltip>,
          ]}
        >
          <Card.Meta
            title={
              <Typography.Text
                copyable={{
                  text: shareURL(data.url),
                  tooltips: ['Copy share URL to clipboard', 'Copied!'],
                  icon: <LinkOutlined />,
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
              <TimeAgo date={data.createdAt} formatter={formatter} />
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
