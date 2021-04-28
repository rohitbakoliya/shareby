import styled from 'styled-components';

export const IndexWrapper = styled.section`
  height: calc(100vh - 100px);
  .ant-row.main-content {
    height: inherit;
  }
  .ant-col.main-content--col {
    padding-left: 18px;
    padding-right: 18px;
  }
  /* .ant-row.main--content {
  & > *:first-child {
    padding-left: 0;
  }
  & > *:last-child {
    padding-right: 0;
  }
} */
`;
