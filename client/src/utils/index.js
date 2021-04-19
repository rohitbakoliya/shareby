export * from './getms';
export * from './httpInstance';
export * from './history';

export const noop = () => {};

export const rTabs = str => str.trim().replace(/^ {4}/gm, '');

export const upperFirst = str => `${str[0].toUpperCase()}${str.slice(1)}`;

export const pasteURL = id => `http://localhost:3000/${id}`;

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
