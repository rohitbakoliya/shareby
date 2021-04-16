import CodeEditorContext from 'contexts/codeEditorContext';
import React, { useState } from 'react';
import Editor from './Editor';
import EditorHeader from './EditorHeader';

const CodeEditor = () => {
  const [language, setLanguage] = useState('javascript');
  const [es, setEs] = useState({
    theme: 'light',
    options: {
      tabSize: 2,
      fontSize: '14px',
      readOnly: false,
      intellisense: true,
      wordWrap: 'off',
    },
  });

  const updateOptions = options => {
    setEs(_es => ({
      ..._es,
      options: {
        ...options,
      },
    }));
  };

  const toggleTheme = () => {
    setEs(_es => ({
      ..._es,
      theme: _es.theme === 'light' ? 'vs-dark' : 'light',
    }));
  };
  return (
    <>
      <CodeEditorContext.Provider value={{ es, updateOptions, toggleTheme }}>
        <EditorHeader setLanguage={setLanguage} language={language} />
        <Editor language={language} />
      </CodeEditorContext.Provider>
    </>
  );
};
export default CodeEditor;
