const Joi = require('joi');

const registerValidator = (data) => {
  const phoneRegexp = new RegExp("(05|5)[0-9][0-9][1-9]([0-9]){6}");
  const schema = Joi.object({
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().regex(phoneRegexp).required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
}

const loginValidator = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(8).required(),
  });
  return schema.validate(data);
}

module.exports.registerValidator = registerValidator;
module.exports.loginValidator = loginValidator;
