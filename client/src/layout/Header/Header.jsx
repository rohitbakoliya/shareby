import { Link } from 'react-router-dom';
import { HeaderWrapper } from './Header.style';

const Header = () => {
  return (
    <HeaderWrapper>
      <Link to="/">Home</Link>
      <Link to="/recent">Recent Pastes</Link>
    </HeaderWrapper>
  );
};
export default Header;
