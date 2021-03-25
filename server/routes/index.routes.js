import express from 'express';
import httpStatus from 'http-status-codes';

const router = express.Router();

// other routes
router.use('/*', (req, res) => {
  res
    .status(httpStatus.NOT_IMPLEMENTED)
    .json({ error: 'Api endpoint Not Implemented!' });
});

export default router;
