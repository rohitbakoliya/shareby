import EditorJs from 'react-editor-js';
import { RichEditorInner, RichEditorWrapper } from './index.style';
import { EDITOR_JS_TOOLS } from './tools';
import PropTypes from 'prop-types';

const RichTextEditor = ({ blocks, addBlocks, readOnly }) => {
  return (
    <RichEditorWrapper id="editorjs">
      <RichEditorInner>
        <EditorJs
          data={{
            blocks,
          }}
          readOnly={readOnly}
          placeholder="Start writing and share with others!"
          autofocus
          onChange={addBlocks}
          tools={EDITOR_JS_TOOLS}
        />
      </RichEditorInner>
    </RichEditorWrapper>
  );
};
RichTextEditor.defaultProps = {
  readOnly: false,
};
RichTextEditor.propTypes = {
  readOnly: PropTypes.bool,
  blocks: PropTypes.array.isRequired,
  addBlocks: PropTypes.func.isRequired,
};
export default RichTextEditor;
