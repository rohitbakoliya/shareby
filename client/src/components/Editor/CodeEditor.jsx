import MonacoEditor from '@monaco-editor/react';
import { PropagateLoader as Loader } from 'react-spinners';
import { useState } from 'react';
import { examples, languages } from './config';

const CodeEditor = () => {
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState(languages.find(lang => lang.name === 'javascript'));
  const [isEditorReady, setIsEditorReady] = useState(false);

  const handleEditorDidMount = () => {
    setIsEditorReady(true);
  };
  return (
    <MonacoEditor
      height="600px" // By default, it fully fits with its parent
      width="1092px"
      theme={theme}
      language={language.name}
      loading={<Loader color="lightblue" />}
      value={examples[language.id]}
      editorDidMount={handleEditorDidMount}
    />
  );
};

export default CodeEditor;
