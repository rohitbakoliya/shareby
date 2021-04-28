import { Typography, Card, Row, Col, Tooltip, message } from 'antd';
import {
  CalendarOutlined,
  ClockCircleOutlined,
  CloudDownloadOutlined,
  CopyOutlined,
  LockOutlined,
  CodeOutlined,
  CheckOutlined,
  FileImageOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import TimeAgo from 'react-timeago';
import FileSaver from 'file-saver';
import qs from 'qs';
import { copyToClipboard, http, pasteURL, SERVER_URL, upperFirst } from 'utils';
import { useState } from 'react';
import { carbonDefaultParams } from 'utils/carbonDefaults';
import { SharedOptionsWrapper } from './Options.style';

const CodeShared = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCopyCode = () => {
    if (copied) return;
    copyToClipboard(data.body);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 3000);
  };
  const handleDownload = () => {
    const blob = new Blob([data.body], { type: 'text/plain;charset=utf-8' });
    FileSaver.saveAs(blob, `${data.url}.txt`);
  };

  const createCarbonImage = async () => {
    setLoading(true);
    try {
      const resp = await http.post(
        `https://carbon-ss.herokuapp.com/api/carbon-ss?${qs.stringify(carbonDefaultParams)}`,
        {
          data: data.body,
        }
      );
      const imageBuffer = Buffer.from(resp.image, 'base64');
      FileSaver.saveAs(new Blob([imageBuffer]), `${data.url}.png`);
      setLoading(false);
    } catch (err) {
      console.log(err);
      message.error(`something went wrong while download image, please try again later`);
      setLoading(false);
    }
  };

  return (
    <SharedOptionsWrapper>
      <div className="options--content">
        <Card
          bordered={false}
          loading={!data}
          actions={[
            <Tooltip title="download code" placement="bottom">
              <CloudDownloadOutlined key="download" onClick={handleDownload} />
            </Tooltip>,
            <Tooltip
              title={copied ? 'copied!' : 'copy code to clipboard'}
              onClick={handleCopyCode}
              placement="bottom"
            >
              {copied ? <CheckOutlined key="copy" /> : <CopyOutlined key="copy" />}
            </Tooltip>,
            <Tooltip title="view raw file" placement="bottom">
              <Typography.Link target="__blank" href={`${SERVER_URL}/api/pastes/${data.url}/raw`}>
                <CodeOutlined key="raw" />
              </Typography.Link>
            </Tooltip>,
            <Tooltip
              title={loading ? 'generating image...' : 'generate image from code'}
              placement="bottom"
            >
              {loading ? (
                <LoadingOutlined key="carbon" />
              ) : (
                <FileImageOutlined key="carbon" onClick={createCarbonImage} />
              )}
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

export default CodeShared;
