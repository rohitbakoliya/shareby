import { Popover, Tooltip } from 'antd';
import { SettingFilled } from '@ant-design/icons';
import SettingMenu from './SettingMenu';

const Settings = () => {
  return (
    <Popover placement="bottomRight" trigger="click" content={SettingMenu}>
      <Tooltip title="editor settings">
        <SettingFilled style={{ fontSize: '22px' }} />
      </Tooltip>
    </Popover>
  );
};

export default Settings;
