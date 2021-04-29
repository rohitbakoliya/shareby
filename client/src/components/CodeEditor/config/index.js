export { default as examples } from './examples';
export * from './languages';
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
