import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import CodeEditor from 'components/CodeEditor';
import { languages, examples } from 'components/CodeEditor/config';
import CodeSharingOptions from 'components/SharingOptions/CodeSharing';
import LangValContext from 'contexts/langValContext';
import Layout from 'layouts/Root';
import EditorLayout from 'layouts/Editor';
import SEO from 'components/SEO';

const IndexPage = () => {
  const { state: routerState } = useLocation();

  /**
   * Not good idea
   const history = useHistory();
   // to clear history state
   useEffect(() => {
     if (routerState) {
       history.replace('/', undefined);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    */

  const initLang = languages.find(lang => lang.name === 'plaintext');
  const favLang = JSON.parse(localStorage.getItem('favLanguage'));
  const defaultCodes = JSON.parse(localStorage.getItem('defaultTemplates'));

  /**
   * routerState is used here because whenever someone forks the share then
   * share details are propogated to `/` route using history
   */
  const [language, setLanguage] = useState(
    (routerState && routerState.language) || favLang || initLang
  );

  // adding initail codes for all languages
  const [codes, setCodes] = useState(
    Object.fromEntries(
      languages.map(({ id }) => [
        id,
        (routerState &&
          routerState.language &&
          routerState.language.id === id &&
          routerState.code) ||
          (defaultCodes && defaultCodes[id]) ||
          examples[id],
      ])
    )
  );

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
    <Layout>
      <SEO title="Code Editor" />
      <LangValContext.Provider value={{ language, handleLangChange, codes, handleCodeChange }}>
        <EditorLayout left={<CodeEditor />} right={<CodeSharingOptions />} />
      </LangValContext.Provider>
    </Layout>
  );
};

export default IndexPage;
