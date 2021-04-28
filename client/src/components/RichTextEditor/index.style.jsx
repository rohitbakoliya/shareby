import styled, { css } from 'styled-components';
import Scrollbar from 'styles/scrollbar.style';

const editorStyling = css`
  font-size: 15px;
  h1 {
    font-size: 2em;
  }
`;

export const RichEditorWrapper = styled.div`
  height: calc(100vh - 100px);
  box-shadow: 0 24px 24px -18px rgb(69 104 129 / 33%), 0 9px 45px 0 rgb(114 119 160 / 12%);
  background-color: white;
  border-radius: 8px;
  overflow-y: auto;
  ${Scrollbar};
  ${editorStyling};
`;

export const RichEditorInner = styled.div`
  margin: 50px 30px;
  .codex-editor__redactor {
    padding-bottom: 50px !important;
  }
`;
