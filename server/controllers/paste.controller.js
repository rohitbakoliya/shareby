import httpStatus from 'http-status-codes';
import { nanoid } from 'nanoid';
import { validatePaste, validateUrl, validatePassword } from '../validators/paste.validator';
import Paste from '../models/Paste';

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
  const MX_PASTES = 20;
  try {
    const pastes = await Paste.find({ access: 'public' });
    return res.status(httpStatus.OK).json({ data: pastes.slice(0, MX_PASTES) });
  } catch (err) {
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
    // TODO: when paste access is private and user is not logged in

    const url = nanoid(8);
    const paste = new Paste({
      ...value,
      url,
    });
    const savedPaste = await paste.save();
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
    const paste = await Paste.findOne({ url: value });
    if (!paste) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `paste not found with ${url} url` });
    }
    const data = {
      // _id: paste._id,
      access: paste.access,
    };
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
  // TODO: need better nanoid validation
  const { error, value } = validateUrl(url);
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });

  try {
    const paste = await Paste.findOne({ url: value });
    if (!paste) {
      return res.status(httpStatus.NOT_FOUND).json({ error: `paste not found with ${url} url` });
    }
    if (paste.access !== 'public') {
      return res
        .status(httpStatus.FORBIDDEN)
        .json({ error: `Access to this paste is not allowed` });
    }
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
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });

  const {
    error: error1,
    value: { password },
  } = validatePassword(req.body);

  if (error1)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error1.details[0].message });
  try {
    const paste = await Paste.findOne({ url });
    if (!paste)
      return res.status(httpStatus.NOT_FOUND).json({ error: `paste not found with ${url} url` });

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
    return res.send(paste.body);
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(`something went wrong`);
  }
};
