import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Code from '@editorjs/code';
import LinkTool from '@editorjs/link';
import Header from '@editorjs/header';
import Quote from '@editorjs/quote';
import Marker from '@editorjs/marker';
import CheckList from '@editorjs/checklist';
import Delimiter from '@editorjs/delimiter';
import InlineCode from '@editorjs/inline-code';
import SimpleImage from '@editorjs/simple-image';

export const EDITOR_JS_TOOLS = {
  embed: {
    class: Embed,
    inlineToolbar: true,
  },
  table: Table,
  paragraph: { class: Paragraph, inlineToolbar: true },
  list: List,
  code: Code,
  linkTool: LinkTool,
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};

export const initialBlocks = [
  {
    type: 'header',
    data: {
      text: 'What does it mean «block-styled editor»',
      level: 3,
    },
  },
  {
    type: 'paragraph',
    data: {
      text: 'Clean data is useful to sanitize, validate and process on the backend.',
    },
  },
  {
    type: 'paragraph',
    data: {
      text:
        "We have been working on this project more than three years. Several large media projects help us to test and debug the Editor, to make it's core more stable. At the same time we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy. 😏",
    },
  },
  {
    type: 'simpleImage',
    data: {
      url: 'https://codex.so/public/app/img/external/codex2x.png',
      caption: 'CodeX',
      withBorder: false,
      withBackground: false,
      stretched: false,
    },
  },
];
