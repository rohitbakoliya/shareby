import { useState } from 'react';
import { Row, Col } from 'antd';
import CodeEditor from 'components/CodeEditor';
import { languages, examples } from 'components/CodeEditor/config';
import SharingOptions from 'components/SharingOptions';
import LangValContext from 'contexts/langValContext';
import Layout from 'layout';
import { IndexWrapper } from './index.style';
import { useLocation } from 'react-router-dom';

const IndexPage = () => {
  const { state: routerState } = useLocation();

  const initLang = languages.find(lang => lang.name === 'plaintext');
  const favLang = JSON.parse(localStorage.getItem('favLanguage'));
  const defaultCodes = JSON.parse(localStorage.getItem('defaultTemplates'));

  const [language, setLanguage] = useState(
    (routerState && routerState.language) || favLang || initLang
  );
  const [code, setCode] = useState(
    (routerState && routerState.code) ||
      (favLang && ((defaultCodes && defaultCodes[favLang.id]) || examples[favLang.id])) ||
      examples[initLang.id]
  );

  const handleLangChange = langName => {
    const lang = languages.find(lang => lang.name === langName);
    setLanguage(lang);
    // !BUG: changing languages should not loose written code
    // ?REFACTOR: save codes of all the languages
    setCode((defaultCodes && defaultCodes[lang.id]) || examples[lang.id]);
  };

  const handleCodeChange = value => {
    setCode(value);
  };

  return (
    <Layout>
      <LangValContext.Provider value={{ language, handleLangChange, code, handleCodeChange }}>
        <IndexWrapper>
          <Row wrap={false} className="main-content">
            <Col flex="auto" className="main-content--col">
              <CodeEditor />
            </Col>
            <Col flex="400px" className="main-content--col">
              <SharingOptions />
            </Col>
          </Row>
        </IndexWrapper>
      </LangValContext.Provider>
    </Layout>
  );
};

export default IndexPage;
