import styled from 'styled-components';

export const RichEditorWrapper = styled.div`
  height: calc(100vh - 100px);
  box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%), 0 9px 45px 0 rgb(114 119 160 / 12%);
  background-color: white;
  border-radius: 8px;
`;

export const RichEditorInner = styled.div`
  padding: 50px 30px;
`;

export const BGWrapper = styled.main`
  background: #eef5fa;
  margin-top: -20px;
  margin-bottom: -20px;
  padding-top: 20px;
  padding-bottom: 20px;
  .ant-row.main-content {
    height: inherit;
  }
  .ant-col.main-content--col {
    padding-left: 18px;
    padding-right: 18px;
  }
`;
