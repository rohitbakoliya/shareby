import styled from 'styled-components';
import Header from './Header/Header';

const ChildrendWrapper = styled.main`
  background: ${p => p.theme.colors.accent};
  padding-top: 20px;
  min-height: calc(100vh - 50px);
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
