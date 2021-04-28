import { EditorWrapper, LeftContent, RightContent } from './index.style';
import PropTypes from 'prop-types';

const EditorLayout = ({ left: LeftComponent, right: RightComponent }) => {
  return (
    <EditorWrapper>
      <LeftContent>{LeftComponent}</LeftContent>
      <RightContent>{RightComponent}</RightContent>
    </EditorWrapper>
  );
};

EditorLayout.propTypes = {
  left: PropTypes.element.isRequired,
  right: PropTypes.element.isRequired,
};

export default EditorLayout;
