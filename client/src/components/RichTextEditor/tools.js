import Embed from '@editorjs/embed';
import Table from '@editorjs/table';
import Paragraph from '@editorjs/paragraph';
import List from '@editorjs/list';
import Code from '@editorjs/code';
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
  header: Header,
  quote: Quote,
  marker: Marker,
  checklist: CheckList,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  simpleImage: SimpleImage,
};
