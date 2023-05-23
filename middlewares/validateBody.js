const {HttpError} = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next)=> {

      if(Object.keys(req.body).length === 0) {
        next(HttpError(400, "missing fields"));
      }

      const {error} = schema.validate(req.body);
      console.log(error.context)
      if (error) {
        const validationErrors = error.details.map(detail => detail.message);
        next(HttpError(400, `${validationErrors.join(', ')}`));
      }
      else {
        next();
    }
  }
  return func;
}

const validateFavorites = schema => {
  const func = (req, res, next)=> {
    if(Object.keys(req.body).length === 0) {
      next(HttpError(400, "missing field favorite"));
    }
    next()
  }
  return func
}

const validateEmail = schema => {
  const func = (req, res, next)=> {

    const {error} = schema.validate(req.body);
    
    if(error) {
      if(Object.keys(req.body).length === 0 || error.details.type === "any.required") {
        next(HttpError(400, "missing required field email"));
      }
    }
    next()
  }
  return func
}

module.exports = {
  validateBody, 
  validateFavorites,
  validateEmail
};