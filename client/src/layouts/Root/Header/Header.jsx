import { NavLink } from 'react-router-dom';
import { HeaderWrapper } from './Header.style';

const Header = () => {
  return (
    <HeaderWrapper>
      <NavLink to="/" exact activeClassName="active__tab">
        Code Editor
      </NavLink>
      <NavLink to="/r" activeClassName="active__tab">
        Rich Text Editor
      </NavLink>
      <NavLink to="/recent" activeClassName="active__tab">
        Recent Shares
      </NavLink>
    </HeaderWrapper>
  );
};
export default Header;
