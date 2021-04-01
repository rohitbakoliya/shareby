import express from 'express';
import {
  checkAccess,
  createPaste,
  getAllPastes,
  getPasteByUrl,
  protectedPaste,
} from '../controllers/paste.controller';

const router = express.Router();

router.get('/', getAllPastes);
router.post('/', createPaste);
router.get('/:url', getPasteByUrl);
router.post('/:url', protectedPaste);
router.get('/:url/access', checkAccess);

export default router;
