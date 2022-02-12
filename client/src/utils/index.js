export * from './getms';
export * from './httpInstance';
export * from './history';
export * from './editorjsParsers/htmlParser';
export * from './editorjsParsers/mdParser';

export const noop = () => {};

export const rTabs = str => str.trim().replace(/^ {4}/gm, '');

export const upperFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`;

export const SERVER_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:5000`
    : `https://shareby.herokuapp.com`;

export const CLIENT_URL =
  process.env.NODE_ENV === 'development'
    ? `http://localhost:3000`
    : `https://shareby.herokuapp.com`;

export const shareURL = id => `${CLIENT_URL}/${id}`;

export const copyToClipboard = str => {
  let temp = document.createElement('textarea');
  temp.value = str;
  temp.setAttribute('readonly', '');
  temp.style.position = 'absolute';
  temp.style.left = '-9999px';
  document.body.appendChild(temp);
  temp.select();
  document.execCommand('copy');
  document.body.removeChild(temp);
};
