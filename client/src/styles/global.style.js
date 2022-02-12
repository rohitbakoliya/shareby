import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  body {
    background: ${props => props.theme.colors.accent};
  }
  .markdown-preview {
    padding-bottom: 20px;
    img {
      width: 50%;
    }
    p, a, div, span, li {
      font-size: 16px;
    }
    pre * {
      font-size: 14px;
    }
  }
  .nav__drawer .ant-drawer-body {
    padding: 12px;
  }
  @media screen and (min-width: ${p => p.theme.media.md}){
    .nav__drawer {
      display: none;
    }
  }
`;

export default GlobalStyles;
