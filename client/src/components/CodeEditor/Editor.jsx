import MonacoEditor from '@monaco-editor/react';
import MarkdownRenderer from 'components/MarkdownRenderer';
import CodeEditorContext from 'contexts/codeEditorContext';
import LangValContext from 'contexts/langValContext';
import React, { useContext } from 'react';
import { PropagateLoader as Loader } from 'react-spinners';
import { intellisense, noIntellisense } from './config';
import { CodeEditorWrapper } from './Editor.style';

// `code--container` for full screen code editor

const Editor = React.memo(({ activeTab }) => {
  const { es } = useContext(CodeEditorContext);
  const { codes, handleCodeChange, language } = useContext(LangValContext);
  let options = { ...es.options };
  delete options.intellisense;
  if (es.options.intellisense) {
    options = { ...options, ...intellisense };
  } else {
    options = { ...options, ...noIntellisense };
  }
  return (
    <CodeEditorWrapper id={activeTab === 0 ? 'code--container' : undefined} activeTab={activeTab}>
      {activeTab === 1 ? (
        <MarkdownRenderer children={codes[language.id]} />
      ) : (
        <MonacoEditor
          theme={es.theme}
          options={options}
          language={language.name}
          loading={<Loader color="lightblue" />}
          value={codes[language.id]}
          onChange={handleCodeChange}
        />
      )}
    </CodeEditorWrapper>
  );
});

export default Editor;
