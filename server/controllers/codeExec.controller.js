import httpStatus from 'http-status-codes';
import { hckHttp, http } from '../utils/httpInstance';
import { validateSubmissionBody } from '../validators/codeExec.validator';

/**
 * @desc    to submit a code execution request
 * @route   POST /api/submissions/
 * @access  public
 */
export const codeSubmission = async (req, res) => {
  const { value, error } = validateSubmissionBody(req.body);
  if (error)
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).json({ error: error.details[0].message });

  try {
    const { data } = await hckHttp.post('/', value);
    return res.status(httpStatus.OK).json({ data: data });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ error: `something went wrong while submitting your code` });
  }
};

/**
 * @desc    get status of a submission by id
 * @route   GET /api/submissions/:id
 * @access  public
 */
export const getSubmissionStatus = async (req, res) => {
  const id = req.params.id;
  try {
    const {
      data: { result },
    } = await hckHttp(`/${id}`);
    if (result.compile_status === 'OK') {
      const { data } = await http.get(result.run_status.output);
      result.output = data;
      delete result.run_status;
      return res.status(httpStatus.OK).json({ data: result });
    } else {
      delete result.run_status;
      return res.status(httpStatus.OK).json({ data: result });
    }
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ error: `something went wrong` });
  }
};
