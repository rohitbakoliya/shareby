import styled from 'styled-components';
import Header from './Header/Header';

const ChildrednWrapper = styled.div`
  background: ${p => p.theme.colors.accent};
  padding-top: 20px;
  min-height: calc(100vh - 60px);
`;

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <ChildrednWrapper>{children}</ChildrednWrapper>
    </>
  );
};
export default Layout;
