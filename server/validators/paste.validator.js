import Joi from 'joi';

export const emailValidator = Joi.string()
  .required()
  .min(5)
  .max(100)
  .email({ minDomainSegments: 2 })
  .trim();

export const languageValidator = Joi.string().valid(
  'Text',
  'Markdown',
  'C',
  'C++',
  'HTML',
  'CSS',
  'JSON',
  'Java',
  'JavaScript'
);

export const passwordValidator = Joi.string().required().min(4).max(50);

export const validateUrl = url => Joi.string().required().validate(url);

export const validatePassword = password => {
  const passwordSchema = Joi.object({
    password: passwordValidator,
  });
  return passwordSchema.validate(password);
};

export const validatePaste = paste => {
  const PasteSchema = Joi.object({
    title: Joi.string().trim().max(50),
    body: Joi.string().required().trim().min(4).max(4000),
    language: languageValidator,
    password: Joi.string().trim().min(4).max(50),
    access: Joi.string().required().valid('public', 'protected', 'private'),
    expireAt: Joi.date().required(),
    createdAt: Joi.date().default(Date.now),
  });
  return PasteSchema.validate(paste);
};
