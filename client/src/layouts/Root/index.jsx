import styled from 'styled-components';
import Header from './Header/Header';

const ChildrendWrapper = styled.main`
  margin-top: 20px;
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ChildrendWrapper>{children}</ChildrendWrapper>
    </>
  );
};
export default Layout;
