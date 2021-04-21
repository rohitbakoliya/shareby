import styled, { css } from 'styled-components';

export const CodeEditorWrapper = styled.div`
  height: 100%;
  ${p =>
    p.activeTab === 1
      ? css`
          overflow-y: auto;
          border: 1px solid rgba(0, 0, 0, 0.16);
          border-radius: 2px;
        `
      : css``}
`;

export const EditorHeaderWrapper = styled.div`
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  span {
    margin-right: 8px;
  }

  .header-options .anticon {
    transition: color 0.3s;
    &:hover {
      color: #40a9ff;
    }
  }

  .tab--col-md {
    cursor: pointer;
    display: flex;
    align-items: center;
    margin-left: 20px;
    padding: 0 9px 5px 9px;
    border-bottom: 2px solid transparent;
    transition: color, border-bottom 0.4s;
    &:last-child {
      margin-left: 0px;
    }
    span.text-span {
      font-weight: 600;
      margin-right: 0;
      user-select: none;
    }
  }
  .tab--col-md.active {
    color: #40a9ff;
    border-bottom: 2px solid #40a9ff;
  }
`;
