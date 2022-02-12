import styled from 'styled-components';

export const OptionsWrapper = styled.div`
  padding-top: 10px;
  height: 100%;
  width: 100%;
`;
export const OptionsContent = styled.div`
  padding: 10px 0 10px 15px;
  height: 100%;
  .ant-typography {
    text-align: center;
    line-height: 2;
  }
  .ant-form-item {
    margin-bottom: 17px;
    .ant-form-item-explain {
      font-size: 10px;
      margin-bottom: -15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  @media (min-width: 992px) {
    button {
      position: fixed;
      bottom: 20px;
    }
  }
`;
