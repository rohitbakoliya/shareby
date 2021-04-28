import styled from 'styled-components';

export const RecentPasteWrapper = styled.div`
  max-width: 1000px;
  margin: -20px auto 0 auto;
  .ant-table {
    box-shadow: ${p => p.theme.shadows.large};
    border-radius: 8px;
    overflow: hidden;
  }
`;
