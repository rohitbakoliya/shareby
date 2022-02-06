const crypto = require('crypto');
const { customAlphabet: nnId } = require('nanoid');

const CHARLIST = `0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`;
const KEY_SIZE = 8;

export const getUID = (size = KEY_SIZE) => {
  const id = crypto
    .randomBytes(32)
    .toString('base64')
    .replace(/\+/g, '')
    .replace(/\//g, '')
    .replace(/=/g, '')
    .slice(0, size);

  return id;
};

export const getNanoId = () => nnId(CHARLIST, KEY_SIZE)();
