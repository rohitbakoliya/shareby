import { GITHUB_URL } from 'config/constants';
import styled from 'styled-components';

const FixedStyles = styled.div`
  right: 16px;
  bottom: 16px;
  position: fixed;
  z-index: 10000;
  box-shadow: 0 2px 18px 0 rgb(0 0 0 / 30%);
  background-color: white;
  border-radius: 7px;
  padding: 12px 15px;
`;
const MadeWithLove = () => (
  <FixedStyles>
    <span>
      Made with 💜 By{' '}
      <a href={GITHUB_URL} target="__blank">
        Rohit
      </a>
    </span>
  </FixedStyles>
);

export default MadeWithLove;
