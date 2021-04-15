import { Select, Col, Row, Dropdown, Menu } from 'antd';
import { FullscreenOutlined, SettingFilled } from '@ant-design/icons';
import { languages, defaultThemes } from './config';
import styled from 'styled-components';

const HeaderWrapper = styled.div`
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  span {
    margin-right: 8px;
  }
`;

const settingsMenu = (
  <Menu>
    <Menu.ItemGroup title="Theme">
      <Menu.Item>Light</Menu.Item>
      <Menu.Item>Dark</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="Editor Mode">
      <Menu.Item>Visual Studio</Menu.Item>
      <Menu.Item>Emacs</Menu.Item>
      <Menu.Item>Vim</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="Font">
      <Menu.Item>Small</Menu.Item>
      <Menu.Item>Medium</Menu.Item>
      <Menu.Item>Large</Menu.Item>
    </Menu.ItemGroup>
    <Menu.ItemGroup title="Tab Space">
      <Menu.Item>8 spaces</Menu.Item>
      <Menu.Item>4 spaces</Menu.Item>
      <Menu.Item>2 spaces</Menu.Item>
    </Menu.ItemGroup>
  </Menu>
);

const EditorHeader = ({ setLanguage, setTheme }) => {
  const handleLangChange = lang => setLanguage(lang);
  const handleThemeChange = theme => setTheme(theme);

  const handleFullScreen = () => {
    const element = document.getElementById('code--container');
    if (document.fullscreenEnabled) {
      element.requestFullscreen();
    }
  };

  return (
    <HeaderWrapper>
      <Row align="middle">
        <Col span={12}>
          <span>Language: </span>
          <Select defaultValue="plaintext" style={{ width: 180 }} onChange={handleLangChange}>
            {languages.map(lang => (
              <Select.Option key={lang.name}>{lang.name}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6} flex>
          <span>Theme: </span>
          <Select defaultValue="light" style={{ width: 180 }} onChange={handleThemeChange}>
            {defaultThemes.map(theme => (
              <Select.Option key={theme}>{theme}</Select.Option>
            ))}
          </Select>
        </Col>
        <Col span={6}>
          <FullscreenOutlined
            onClick={handleFullScreen}
            style={{ fontSize: '22px', marginRight: '12px' }}
          />
          <Dropdown overlay={settingsMenu} trigger="click">
            <SettingFilled style={{ fontSize: '22px' }} />
          </Dropdown>
        </Col>
      </Row>
    </HeaderWrapper>
  );
};
export default EditorHeader;
