import httpStatus from 'http-status-codes';
import { getUID } from '../services';
import { validatePaste, validateUrl, validatePassword } from '../validators/paste.validator';
import Paste from '../models/Paste';
import { setCacheControlHeader } from '../middlewares/setCacheControlHeader';
import { memCache, recentKey, getAccessKey } from '../services/cache';

/**
 * @desc    to get all pastes
 * @route   GET /api/pastes/
 * @access  public
 */
export const getAllPastes = async (req, res) => {
  try {
    const pastes = await Paste.find();
    return res.status(httpStatus.OK).json({ data: pastes });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while fetching pastes` });
  }
};

/**
 * @desc    to get recent public pastes
 * @route   GET /api/pastes/recents
 * @access  public
 */
export const getRecentPublicPastes = async (req, res) => {
  const MX_PASTES = 100;
  try {
    const cachedData = memCache.get(recentKey);
    if (cachedData) {
      return res.status(httpStatus.OK).json({ data: cachedData });
    }
    const pastes = await Paste.find({ access: 'public' })
      .select('-body -_id')
      .sort({ createdAt: -1 })
      .limit(MX_PASTES);
    pastes.sort((a, b) => new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime());

    memCache.set(recentKey, pastes);
    return res.status(httpStatus.OK).json({ data: pastes });
  } catch (err) {
    console.log(err);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while getting recent public pastes` });
  }
};

/**
 * @desc    to create a new paste
 * @route   POST /api/pastes/
 * @access  public
 */
export const createPaste = async (req, res) => {
  const { error, value } = validatePaste(req.body);
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });

  try {
    // when paste access is not protected but req body have password
    if (value.access !== 'protected' && value.password) {
      delete value.password;
    }
    // when paste access is protected and it's not having password
    if (value.access === 'protected' && !value.password) {
      return res
        .status(httpStatus.UNPROCESSABLE_ENTITY)
        .json({ error: 'Password is required for creating a protected paste' });
    }

    const url = getUID();
    const paste = new Paste({
      ...value,
      url,
    });
    const savedPaste = await paste.save();

    // invalidate the cache
    if (savedPaste.access === 'public' && memCache.get(recentKey)) {
      memCache.del(recentKey);
    }
    return res.status(httpStatus.CREATED).json({ data: savedPaste });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while creating your paste` });
  }
};

/**
 * @desc    to find access of a paste by url
 * @route   GET /api/pastes/:url/access
 * @access  public
 */
export const checkAccess = async (req, res) => {
  const url = req.params.url;
  const { error, value } = validateUrl(url);
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  try {
    const accessKey = getAccessKey(url);
    const cached = memCache.get(accessKey);

    const paste = cached || (await Paste.findOne({ url: value }));
    if (!paste) {
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `The share you are looking for is not found or has been deleted!` });
    }

    const data = {
      access: paste.access,
    };
    memCache.set(accessKey, data);

    res.set('Cache-control', setCacheControlHeader(paste.expireAt));
    return res.status(httpStatus.OK).json({ data });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};

/**
 * @desc    to find paste by url
 * @route   GET /api/pastes/:url
 * @access  public
 */
export const getPasteByUrl = async (req, res) => {
  const url = req.params.url;

  const { error, value } = validateUrl(url);
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });

  try {
    const cachedData = memCache.get(url);

    const paste = cachedData || (await Paste.findOne({ url: value }));
    if (!paste) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `paste not found with ${url} url` });
    }
    if (paste.access !== 'public') {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: `Access to this paste is not allowed` });
    }
    memCache.set(url, paste);
    res.set('Cache-control', setCacheControlHeader(paste.expireAt));

    return res.status(httpStatus.OK).json({ data: paste });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};

/**
 * @desc    to validate password for protected pastes
 * @route   POST /api/pastes/:url
 * @access  public
 */
export const protectedPaste = async (req, res) => {
  let url = req.params.url;
  const { error, value } = validateUrl(url);
  url = value;
  if (error) return res.status(httpStatus.NOT_FOUND).json({ error: error.details[0].message });

  const {
    error: error1,
    value: { password },
  } = validatePassword(req.body);

  if (error1)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error1.details[0].message });
  try {
    const paste = await Paste.findOne({ url });
    if (!paste)
      return res
        .status(httpStatus.NOT_FOUND)
        .json({ error: `The paste you are looking for is not found!` });

    // make sure paste is only a protected pastes
    if (paste.access !== 'protected')
      return res
        .status(httpStatus.METHOD_NOT_ALLOWED)
        .json({ error: `Access to this paste is not allowed` });

    // Check/Compares password
    const validPassword = await paste.isValidPassword(password);
    if (!validPassword)
      return res.status(httpStatus.FORBIDDEN).json({ error: 'Password is incorrect' });

    return res.status(httpStatus.OK).json({ data: paste });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};

/**
 * @desc    to view raw paste
 * @route   GET /api/pastes/:url/raw
 * @access  public
 */
export const rawPaste = async (req, res) => {
  let url = req.params.url;
  const { error, value } = validateUrl(url);
  url = value;

  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });
  try {
    const paste = await Paste.findOne({ url });
    if (!paste)
      return res.status(httpStatus.NOT_FOUND).json({ error: `paste not found with ${url} url` });

    if (paste.access !== 'public') {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: `Access to this paste is not allowed` });
    }

    res.set('Cache-control', setCacheControlHeader(paste.expireAt));

    return res.set('content-type', 'text/plain').send(paste.body);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`something went wrong`);
  }
};
