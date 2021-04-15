import MonacoEditor from '@monaco-editor/react';
import { PropagateLoader as Loader } from 'react-spinners';

// code--container for full screen code editor

const Editor = ({ language, value, theme }) => {
  return (
    <div id="code--container" style={{ height: '100%' }}>
      <MonacoEditor
        theme={theme}
        language={language}
        loading={<Loader color="lightblue" />}
        value={value}
      />
    </div>
  );
};

export default Editor;
