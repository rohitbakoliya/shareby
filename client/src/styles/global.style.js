import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

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

  @media screen and (min-width: 992px) {
    body {
      overflow-y: hidden;
    }
  }
`;

export default GlobalStyles;
