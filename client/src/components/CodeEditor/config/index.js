export { default as examples } from 'config/codeEditor.examples';
export { default as languages } from 'config/languages';
export const defaultThemes = ['vs-dark', 'light'];

export const noIntellisense = {
  quickSuggestions: false,
  snippetSuggestions: false,
  suggest: false,
  suggestOnTriggerCharacters: false,
  suggestSelection: false,
  wordBasedSuggestions: false,
};
export const intellisense = {
  quickSuggestions: true,
  snippetSuggestions: true,
  suggest: true,
  suggestOnTriggerCharacters: true,
  suggestSelection: true,
  wordBasedSuggestions: true,
};

export const mobOptions = {
  tabSize: 2,
  fontSize: '11px',
  readOnly: false,
  intellisense: true,
  wordWrap: 'off',
  minimap: {
    enabled: false,
  },
  lineNumbersMinChars: 2,
  lineNumbers: 'off',
};

export const defaultOptions = {
  tabSize: 4,
  fontSize: '14px',
  readOnly: false,
  intellisense: true,
  wordWrap: 'off',
  minimap: {
    enabled: true,
  },
  lineNumbersMinChars: 5,
  lineNumbers: 'on',
};

export const defaultFontSizeOptions = [
  {
    label: 'Small',
    value: '14px',
  },
  {
    label: 'Medium',
    value: '17px',
  },
  {
    label: 'Large',
    value: '20px',
  },
];

export const mobFontSizeOptions = [
  {
    label: 'Small',
    value: '11px',
  },
  {
    label: 'Medium',
    value: '13px',
  },
  {
    label: 'Large',
    value: '15px',
  },
];
