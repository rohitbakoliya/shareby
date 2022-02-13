import React, { useState, useEffect } from 'react';
import { Grid } from 'antd';
import CodeEditorContext from 'contexts/codeEditorContext';
import Editor from './Editor';
import { CodeEditorContainer } from './Editor.style';
import EditorHeader from './EditorHeader';
import { defaultOptions, mobOptions } from './config';

const { useBreakpoint } = Grid;

const CodeEditor = ({ defaultOptionsProps }) => {
  // active tab -> used in markdown preview
  const [activeTab, setActiveTab] = useState(0);

  const handleActiveTab = tabInd => {
    setActiveTab(tabInd);
  };

  const screens = useBreakpoint();

  const favOptions = JSON.parse(localStorage.getItem('favOptions'));
  const favTheme = localStorage.getItem('editorTheme');

  const [es, setEs] = useState({
    theme: favTheme || 'light',
    options: { ...defaultOptions, ...favOptions, ...defaultOptionsProps },
  });

  // handles mobile view with different editor options
  useEffect(() => {
    if (screens.xs) {
      const initOptions = { ...mobOptions, ...favOptions, ...defaultOptionsProps };
      updateOptions(initOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [screens.sm]);

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
