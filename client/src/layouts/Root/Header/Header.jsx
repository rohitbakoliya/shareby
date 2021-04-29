import { NavLink } from 'react-router-dom';
import { HeaderWrapper } from './Header.style';
import Logo from 'assets/logo.svg';

const Header = () => {
  return (
    <HeaderWrapper>
      <div>
        <img src={Logo} alt="app logo" height="60px" />
      </div>
      <div>
        <NavLink to="/" exact activeClassName="active__tab">
          Code Editor
        </NavLink>
        <NavLink to="/r" activeClassName="active__tab">
          Rich Text Editor
        </NavLink>
        <NavLink to="/recent" activeClassName="active__tab">
          Recent Shares
        </NavLink>
      </div>
    </HeaderWrapper>
  );
};
export default Header;
