import { NavLink } from 'react-router-dom';
import { HeaderWrapper } from './Header.style';
import Logo from 'assets/logo.svg';
import HeaderMob from './HeaderMob';
import { GithubIcon } from 'components/CustomIcons';
import { PROJECT_URL } from 'config/constants';

const Header = () => {
  return (
    <>
      <HeaderWrapper>
        <NavLink to="/" exact>
          <img src={Logo} alt="app logo" height="45px" />
        </NavLink>
        <div className="nav__links">
          <NavLink to="/" exact activeClassName="active__tab">
            Code Editor
          </NavLink>
          <NavLink to="/r" activeClassName="active__tab">
            Rich Text Editor
          </NavLink>
          <NavLink to="/recent" activeClassName="active__tab">
            Recent Shares
          </NavLink>
          <a className="app__link" target="__blank" href={PROJECT_URL}>
            <span>View on GitHub </span>
            <GithubIcon />
          </a>
        </div>
        <div className="nav__mob">
          <HeaderMob />
        </div>
      </HeaderWrapper>
    </>
  );
};
export default Header;
