import styled, { css } from 'styled-components';

export const RecentPasteWrapper = styled.div`
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  ${p =>
    p.isEmpty &&
    css`
      margin-top: 20px;
    `}

  .ant-table {
    box-shadow: ${p => p.theme.shadows.large};
    border-radius: 8px;
    margin-bottom: 20px;
  }
`;
