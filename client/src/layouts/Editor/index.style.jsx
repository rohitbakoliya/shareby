import styled, { css } from 'styled-components';

export const EditorWrapper = styled.section`
  height: calc(100vh - 90px);
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
  z-index: 1;
  @media screen and (max-width: ${p => p.theme.media.lg}) {
    & {
      height: auto;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 50px;
      padding-left: 0;
      padding-right: 0;
    }
  }
`;

export const LeftContent = styled.div`
  position: absolute;
  width: calc(100% - 430px);
  height: 100%;

  @media screen and (max-width: ${p => p.theme.media.lg}) {
    & {
      all: unset;
      height: 80vh;
      width: 100%;
    }
  }
`;

const BoxCSS = css`
  z-index: -1;
  background-color: white;
  border-radius: 12px;
  box-shadow: ${p => p.theme.shadows.small};
`;

export const RightContent = styled.div`
  position: absolute;
  width: 430px;
  padding-left: 50px;
  height: 50%;
  min-height: 300px;
  top: 50%;
  transform: translateY(-50%);
  right: 20px;
  ${BoxCSS}

  @media screen and (max-width: ${p => p.theme.media.lg}) {
    & {
      all: unset;
      ${BoxCSS}
      width: 100%;
      box-sizing: border-box;
      padding-left: 20px;
      padding-right: 20px;
    }
  }
`;
