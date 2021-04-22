import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  min-height: 60px;
  margin-bottom: 20px;
  background-color: #325288;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;

  a {
    color: inherit;
    font-size: 18px;
    &:hover {
      color: #40a9ff;
    }
    padding: 0 10px;
  }
`;
