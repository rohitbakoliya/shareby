import styled, { css } from 'styled-components';
import Scrollbar from 'styles/scrollbar.style';

export const CodeEditorContainer = styled.section`
  height: 100%;
  background-color: ${p => (p.th === 'light' ? 'white' : '#1e1e1e')};
  padding: 20px 20px 70px 20px;
  border-radius: 8px;
  box-shadow: ${p => p.theme.shadows.large};
`;

export const CodeEditorWrapper = styled.div`
  height: 100%;
  ${p =>
    p.activeTab === 1
      ? css`
          background: white;
          overflow-y: auto;
          border-radius: 8px;
          ${Scrollbar};
        `
      : css``}
`;

const themedSelect = css`
  .ant-select.ant-select-single {
    color: ${p => (p.th === 'light' ? 'rgba(0, 0, 0, 0.85)' : 'rgba(255, 255, 255, 0.85)')};
    .ant-select-selector {
      background-color: ${p => (p.th === 'light' ? '#fff' : '#1e1e1e')};
      border: 1px solid ${p => (p.th === 'light' ? '#d9d9d9' : '#6c6c6c')};
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), color 0ms, background-color 0ms,
        border 0ms;
    }
    .ant-select-arrow {
      color: ${p => (p.th === 'light' ? 'rgba(0, 0, 0, 0.25)' : 'rgba(255, 255, 255, 0.25)')};
    }
    .ant-select-selection-item {
      transition: all 0.3s, color 0ms;
    }
  }
`;

export const EditorHeaderWrapper = styled.div`
  ${p =>
    p.th === 'light'
      ? css`
          color: rgba(0, 0, 0, 0.85);
        `
      : css`
          color: rgba(255, 255, 255, 0.95);
        `};
  height: 30px;
  width: 100%;
  margin-bottom: 20px;
  span {
    margin-right: 8px;
  }

  .header-options .anticon {
    transition: color 0.3s;
    &:hover {
      color: ${p => p.theme.colors.primary};
    }
  }
  .run__btn {
    margin: 0 20px;
    span {
      margin: 0;
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
    color: ${p => p.theme.colors.primary};
    border-bottom: 2px solid ${p => p.theme.colors.primary};
  }
  ${themedSelect}
`;
