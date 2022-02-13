import { Typography, notification, Card, Row, Col, Tooltip, message } from 'antd';
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
  LinkOutlined,
} from '@ant-design/icons';
import TimeAgo from 'react-timeago';
import FileSaver from 'file-saver';
import qs from 'qs';
import { copyToClipboard, http, shareURL, SERVER_URL, upperFirst } from 'utils';
import { useState } from 'react';
import { carbonDefaultParams } from 'config/carbonDefaults';
import { SharedOptionsWrapper } from './Options.style';
import { IMAGE_GEN_ENDPOINT } from 'config/constants';

const openNotification = () => {
  notification.info({
    message: `Note`,
    description: `Generating an image sometimes takes time, or even requests might fail. 
      Usually, Heroku takes 3-5 seconds to load the CPU-intensive idle apps from a cold boot.`,
    duration: 9,
  });
};

export const formatter = (value, unit, suffix) => {
  if (unit === 'second' && value < 15) return 'Just now';
  if (unit === 'second') return `Few moments ${suffix}`;
  const plural = value !== 1 ? 's' : '';
  return `${value} ${unit}${plural} ${suffix}`;
};

const CodeShared = ({ data }) => {
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [notified, setNotified] = useState(false);

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

    if (!notified) openNotification();
    setNotified(true);

    try {
      const resp = await http.post(IMAGE_GEN_ENDPOINT + `?${qs.stringify(carbonDefaultParams)}`, {
        data: data.body,
      });
      const imageBuffer = Buffer.from(resp.image, 'base64');
      FileSaver.saveAs(new Blob([imageBuffer]), `${data.url}.png`);
      setLoading(false);
    } catch (err) {
      message.error(`something went wrong while download image, please try again`);
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

export default CodeShared;
