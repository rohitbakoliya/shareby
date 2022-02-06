import styled from 'styled-components';

export const SharedOptionsWrapper = styled.div`
  height: 100%;
  .ant-typography {
    text-align: center;
  }
  .options--content {
    height: inherit;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .ant-col {
    font-size: 16px;
    .anticon {
      font-size: 18px;
    }
  }

  .ant-card-actions .anticon {
    font-size: 18px;
    color: rgba(0, 0, 0, 0.85);
    transition: color 0.3s;
    &:hover {
      color: #7546c9;
    }
  }
`;
