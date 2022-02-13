import CodeEditorContext from 'contexts/codeEditorContext';
import React, { useState } from 'react';
import Editor from './Editor';
import { CodeEditorContainer } from './Editor.style';
import EditorHeader from './EditorHeader';
import { Grid } from 'antd';
import { initOptions } from './config';

const { useBreakpoint } = Grid;

const CodeEditor = ({ defaultOptions }) => {
  // active tab -> used in markdown preview
  const [activeTab, setActiveTab] = useState(0);
  const handleActiveTab = tabInd => {
    setActiveTab(tabInd);
  };
  const screens = useBreakpoint();

  initOptions = { ...initOptions };

  const favOptions = JSON.parse(localStorage.getItem('favOptions'));
  const favTheme = localStorage.getItem('editorTheme');
  const [es, setEs] = useState({
    theme: favTheme || 'light',
    options: { ...(favOptions || initOptions), ...defaultOptions },
  });

  const updateOptions = options => {
    setEs(_es => ({
      ..._es,
      options: {
        ...es.options,
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
    <CodeEditorContext.Provider value={{ es, updateOptions, toggleTheme }}>
      <CodeEditorContainer th={es.theme}>
        <EditorHeader activeTab={activeTab} handleActiveTab={handleActiveTab} />
        <Editor activeTab={activeTab} />
      </CodeEditorContainer>
    </CodeEditorContext.Provider>
  );
};
export default CodeEditor;
