import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`

  @media screen and (min-width: 992px) {
    body {
      overflow-y: hidden;
    }
  }

  .markdown-preview {
    padding-bottom: 20px;
    img {
      width: 50%;
    }
  }
`;

export default GlobalStyles;
