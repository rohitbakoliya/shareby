import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  min-height: 60px;
  background-color: ${p => p.theme.colors.primary};
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  a {
    color: inherit;
    font-size: 18px;
    transition: 0.2s;
    &:hover {
      transform: scale(1.03);
    }
    padding: 0 10px;
  }
  .active__tab {
    color: #40a9ff;
  }
`;
