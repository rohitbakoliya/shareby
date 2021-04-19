import { Row, Col } from 'antd';
import CodeEditor from 'components/CodeEditor';
import { languages } from 'components/CodeEditor/config';
import SharedOptions from 'components/SharedOptions';
import LangValContext from 'contexts/langValContext';
import { IndexWrapper } from 'pages/IndexPage/index.style';
import { useState } from 'react';

const ShowSharedPaste = ({ data }) => {
  const [language, setLanguage] = useState(languages.find(lang => lang.name === data.language));
  const [code, setCode] = useState(data.body);

  const handleLangChange = langName => {
    // console.log(langName);
    // console.log(defaultCodes);
    const lang = languages.find(lang => lang.name === langName);
    setLanguage(lang);
  };

  const handleCodeChange = value => {
    setCode(value);
  };

  return (
    <>
      <LangValContext.Provider value={{ language, handleLangChange, code, handleCodeChange }}>
        <IndexWrapper>
          <Row wrap={false} className="main-content">
            <Col flex="auto" className="main-content--col">
              <CodeEditor defaultOptions={{ readOnly: true }} />
            </Col>
            <Col flex="400px" className="main-content--col">
              <SharedOptions data={data} />
            </Col>
          </Row>
        </IndexWrapper>
      </LangValContext.Provider>
    </>
  );
};

export default ShowSharedPaste;
