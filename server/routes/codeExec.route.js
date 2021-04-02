import express from 'express';
import { codeSubmission, getSubmissionStatus } from '../controllers/codeExec.controller';

const router = express.Router();

router.post('/', codeSubmission);

router.get('/:id', getSubmissionStatus);

export default router;
