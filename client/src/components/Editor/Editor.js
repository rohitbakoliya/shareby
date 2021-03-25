import { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import sampleCode from './_sampleCode';
require('codemirror/mode/xml/xml');
require('codemirror/mode/javascript/javascript');
require('codemirror/lib/codemirror.css');
require('codemirror/theme/dracula.css');
require('codemirror/theme/panda-syntax.css');
require('codemirror/theme/material.css');

const Editor = () => {
  const [code, setCode] = useState(() => sampleCode.html);
  const options = {
    lineNumbers: true,
    readOnly: false,
    mode: 'xml',
    theme: 'dracula',
    autofocus: true,
  };
  return (
    <div>
      <CodeMirror
        options={options}
        value={code}
        // ref={node => (this.editor = node)}
        // onBeforeChange={(editor, data, value) => {
        //   setCode(value);
        // }}
        onChange={(editor, metadata, value) => {
          setCode(value);
        }}
      />
    </div>
  );
};
export default Editor;
