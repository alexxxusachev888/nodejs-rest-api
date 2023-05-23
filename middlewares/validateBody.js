const {HttpError} = require('../helpers');

const validateBody = schema => {
  const func = (req, res, next)=> {

      if(Object.keys(req.body).length === 0) {
        next(HttpError(400, "missing fields"));
      }

      const {error} = schema.validate(req.body);

      if (error) {
        const validationErrors = error.details.map(detail => detail.message);
        next(HttpError(400, `${validationErrors.join(', ')}`));
      }

      /* if(error) {
        if(error.details.some(detail => detail.type === 'any.required')) {
            next(HttpError(400, 'Помилка від Joi або іншої бібліотеки валідації'));
            return;
        }
    
        const missingFields = error.details.map(detail => detail.context.key);
        next(HttpError(400, `Missing required ${missingFields.join(', ')} field(s)`));
    }  */else {
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

module.exports = {
  validateBody, 
  validateFavorites 
};