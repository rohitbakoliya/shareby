import Joi from 'joi';
import { langMapper } from '../utils';

export const validateSubmissionBody = body => {
  const BodySchema = Joi.object({
    source: Joi.string().required().trim().min(4).max(4000),
    lang: Joi.string()
      .required()
      .valid(...Object.values(langMapper)),
    input: Joi.string().trim().max(4000),
    time_limit: Joi.number().min(1).max(5).default(3),
  });
  return BodySchema.validate(body);
};
