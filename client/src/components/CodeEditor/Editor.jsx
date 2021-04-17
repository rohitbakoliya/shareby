import MonacoEditor from '@monaco-editor/react';
import CodeEditorContext from 'contexts/codeEditorContext';
import LangValContext from 'contexts/langValContext';
import React, { useContext } from 'react';
import { PropagateLoader as Loader } from 'react-spinners';

const noIntellisense = {
  quickSuggestions: false,
  snippetSuggestions: false,
  suggest: false,
  suggestOnTriggerCharacters: false,
  suggestSelection: false,
  wordBasedSuggestions: false,
};
const intellisense = {
  quickSuggestions: true,
  snippetSuggestions: true,
  suggest: true,
  suggestOnTriggerCharacters: true,
  suggestSelection: true,
  wordBasedSuggestions: true,
};

// `code--container` for full screen code editor

const Editor = React.memo(() => {
  const { es } = useContext(CodeEditorContext);
  const { code, handleCodeChange, language } = useContext(LangValContext);
  let options = { ...es.options };
  delete options.intellisense;
  if (es.options.intellisense) {
    options = { ...options, ...intellisense };
  } else {
    options = { ...options, ...noIntellisense };
  }
  return (
    <div id="code--container" style={{ height: '100%' }}>
      <MonacoEditor
        theme={es.theme}
        options={options}
        language={language.name}
        loading={<Loader color="lightblue" />}
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
});

export default Editor;
