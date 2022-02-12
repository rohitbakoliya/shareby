import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  width: 100%;
  min-height: 50px;
  background-color: ${p => p.theme.colors.primary};
  box-shadow: ${p => p.theme.shadows.medium};
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  align-items: center;
  color: white;

  div.nav__mob {
    display: none;
    padding: 6px 0 6px 6px;
    cursor: pointer;
  }

  div.nav__links > a {
    color: inherit;
    font-size: 16px;
    transition: 0.3s;
    &:hover {
      transform: scale(1.03);
    }
    padding: 0 12px;
  }
  .active__tab {
    font-weight: 500;
    color: ${p => p.theme.colors.secondary};
    transform: scale(1.03);
  }
  .app__link {
    &:hover {
      color: ${p => p.theme.colors.secondary};
    }
    & .octicon {
      display: inline-block;
      fill: currentColor;
    }
  }

  @media screen and (max-width: ${p => p.theme.media.md}) {
    padding: 0 25px;
    div.nav__links {
      display: none;
    }
    div.nav__mob {
      display: inline-block;
      div.nav__links {
        display: flex;
        flex-direction: column;
      }
    }
  }
`;
