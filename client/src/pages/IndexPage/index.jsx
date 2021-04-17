import { useState } from 'react';
import { Row, Col } from 'antd';
import Editor from 'components/CodeEditor';
import { languages, examples } from 'components/CodeEditor/config';
import Options from 'components/Options/Options';
import LangValContext from 'contexts/langValContext';
import Layout from 'layout';
import { IndexWrapper } from './index.style';

const IndexPage = () => {
  const initLang = languages.find(lang => lang.name === 'plaintext');
  const favLang = JSON.parse(localStorage.getItem('favLanguage'));
  const defaultCodes = JSON.parse(localStorage.getItem('defaultTemplates'));

  const [language, setLanguage] = useState(favLang || initLang);
  const [code, setCode] = useState(
    (favLang && ((defaultCodes && defaultCodes[favLang.id]) || examples[favLang.id])) ||
      examples[initLang.id]
  );

  const handleLangChange = langName => {
    console.log(langName);
    console.log(defaultCodes);
    const lang = languages.find(lang => lang.name === langName);
    setLanguage(lang);
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
              <Editor />
            </Col>
            <Col flex="400px" className="main-content--col">
              <Options />
            </Col>
          </Row>
        </IndexWrapper>
      </LangValContext.Provider>
    </Layout>
  );
};

export default IndexPage;
