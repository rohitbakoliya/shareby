import CodeEditor from 'components/CodeEditor';
import { languages } from 'components/CodeEditor/config';
import SharedOptions from 'components/SharedOptions/CodeShared';
import LangValContext from 'contexts/langValContext';
import EditorLayout from 'layouts/Editor';
import { useState } from 'react';

const ShowSharedPaste = ({ data }) => {
  const [language, setLanguage] = useState(languages.find(lang => lang.name === data.language));
  const [codes, setCodes] = useState({
    [language.id]: data.body,
  });

  const handleLangChange = langName => {
    const lang = languages.find(lang => lang.name === langName);
    setLanguage(lang);
  };

  const handleCodeChange = value => {
    setCodes({
      ...codes,
      [language.id]: value,
    });
  };

  return (
    <>
      <LangValContext.Provider value={{ language, handleLangChange, codes, handleCodeChange }}>
        <EditorLayout
          left={<CodeEditor defaultOptions={{ readOnly: true }} />}
          right={<SharedOptions data={data} />}
        />
      </LangValContext.Provider>
    </>
  );
};

export default ShowSharedPaste;
