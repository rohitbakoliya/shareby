export const initialBlocks = [
  {
    type: 'header',
    data: {
      text: 'What does it mean «block-style editor»',
      level: 1,
    },
  },
  {
    type: 'paragraph',
    data: {
      text:
        'Hey. Meet the new Editor. On this page, you can see it in action — try to edit this text.',
    },
  },
  {
    type: 'header',
    data: {
      text: 'Key features',
      level: 3,
    },
  },
  {
    type: 'list',
    data: {
      style: 'unordered',
      items: [
        'It is a block-styled editor',
        'It returns clean data output in JSON',
        'Designed to be extendable and pluggable with a simple API',
      ],
    },
  },
  {
    type: 'paragraph',
    data: {
      text:
        'Workspace in classic editors is made of a single content editable element, used to create different HTML markups. Editor.js <mark class="cdx-marker">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent content editable element (or more complex structure) provided by Plugin and united by Editor\'s Core.',
    },
  },
  {
    type: 'paragraph',
    data: {
      text:
        'There are dozens of ready-to-use Blocks and a <a href="https://editorjs.io/creating-a-block-tool">simple API</a> for creation any Block you need. For example, you can implement Blocks for Tweets, Instagram posts, surveys and polls, CTA-buttons, and even games.',
    },
  },
  {
    type: 'header',
    data: {
      text: 'What does it mean clean data output?',
      level: 3,
    },
  },
  {
    type: 'paragraph',
    data: {
      text:
        'We have been working on this project for more than three years. Several large media projects help us to test and debug the Editor, to make its core more stable. At the same time, we significantly improved the API. Now, it can be used to create any plugin for any task. Hope you enjoy it. 😏',
    },
  },
  {
    type: 'simpleImage',
    data: {
      url: 'https://github.com/othneildrew/Best-README-Template/raw/master/images/screenshot.png',
      caption: 'Basic Layout Screenshot',
      withBorder: false,
      withBackground: false,
      stretched: false,
    },
  },
  {
    type: 'delimiter',
    data: {},
  },
];
