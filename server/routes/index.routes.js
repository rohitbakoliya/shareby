import express from 'express';
import httpStatus from 'http-status-codes';
import pasteRoutes from './paste.route';

const router = express.Router();

// paste routes
router.use('/paste', pasteRoutes);

// other routes
router.use('/*', (req, res) => {
  res.status(httpStatus.NOT_IMPLEMENTED).json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
