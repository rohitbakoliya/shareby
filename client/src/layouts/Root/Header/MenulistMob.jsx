import { Menu } from 'antd';
import { GithubIcon } from 'components/CustomIcons';
import { PROJECT_URL } from 'config/constants';
import { NavLink } from 'react-router-dom';

export const MenulistMob = () => (
  <Menu>
    <Menu.Item key="code_editor">
      <NavLink to="/" exact activeClassName="active__tab">
        Code Editor
      </NavLink>
    </Menu.Item>
    <Menu.Item key="rich_editor">
      <NavLink to="/r" activeClassName="active__tab">
        Rich Text Editor
      </NavLink>
    </Menu.Item>
    <Menu.Item key="recent">
      <NavLink to="/recent" activeClassName="active__tab">
        Recent Shares
      </NavLink>
    </Menu.Item>
    <Menu.Item key="github">
      <a className="app__link" target="__blank" href={PROJECT_URL}>
        <span>View on GitHub </span>
        <GithubIcon />
      </a>
    </Menu.Item>
  </Menu>
);
