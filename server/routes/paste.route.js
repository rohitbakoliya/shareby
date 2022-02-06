import express from 'express';
import {
  checkAccess,
  createPaste,
  getPasteByUrl,
  getRecentPublicPastes,
  protectedPaste,
  rawPaste,
} from '../controllers/paste.controller';

const router = express.Router();

/**
 * @deprecated
 */
// router.get('/', getAllPastes);

router.post('/', createPaste);

router.get('/recents', getRecentPublicPastes);

router.get('/:url', getPasteByUrl);

router.post('/:url', protectedPaste);

router.get('/:url/access', checkAccess);

// TODO: only availabel for public pastes
router.get('/:url/raw', rawPaste);

export default router;
