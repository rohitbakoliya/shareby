import styled from 'styled-components';

export const IndexWrapper = styled.section`
  height: calc(100vh - 100px);
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 1;
`;

export const LeftContent = styled.div`
  position: absolute;
  width: calc(100% - 450px);
  height: 100%;
`;
export const RightContent = styled.div`
  position: absolute;
  width: 450px;
  padding-left: 50px;
  height: 50%;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  z-index: -1;
  background-color: white;
  border-radius: 12px;
  box-shadow: ${p => p.theme.shadows.small};
`;
