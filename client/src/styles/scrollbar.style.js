import { css } from 'styled-components';

const Scrollbar = css`
  ::-webkit-scrollbar-track {
    border-radius: 8px;
    background-color: ${props => props.theme.colors.accent};
  }

  ::-webkit-scrollbar {
    width: 7px;
    height: 8x;
    border-radius: 8px;
    background-color: ${props => props.theme.colors.accent};
    cursor: pointer;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background-color: ${props => props.theme.colors.light};
    background-image: ${props => props.theme.gradient};
  }

  ::-moz-scrollbartrack-vertical {
    background-color: ${props => props.theme.colors.accent};
  }
  ::-moz-scrollbar {
    width: 7px;
    height: 8x;
    background-color: ${props => props.theme.colors.accent};
    cursor: pointer;
  }
  ::-moz-scrollbarbutton-up {
    background-color: ${p => p.theme.colors.light};
    background-image: ${props => props.theme.gradient};
  }
`;

export default Scrollbar;
