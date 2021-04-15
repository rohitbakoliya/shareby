import React, { useState } from 'react';
import Editor from './Editor';
import EditorHeader from './EditorHeader';

const CodeEditor = () => {
  const [language, setLanguage] = useState('plaintext');
  const [theme, setTheme] = useState('light');
  console.log(language);
  return (
    <>
      <EditorHeader setLanguage={setLanguage} setTheme={setTheme} />
      <Editor language={language} theme={theme} />
    </>
  );
};
export default CodeEditor;
