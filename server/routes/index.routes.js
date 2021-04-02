import express from 'express';
import httpStatus from 'http-status-codes';
import pasteRoutes from './paste.route';
import codeExecRoutes from './codeExec.route';

const router = express.Router();

// paste routes
router.use('/pastes', pasteRoutes);

// code routes
router.use('/submissions', codeExecRoutes);

// other routes
router.use('/*', (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
