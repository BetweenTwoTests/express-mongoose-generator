'use strict';

/**
 * Module Dependencies
 */

const _controllerName_ = require(_controllerPath_);

/**
 * Route Middlewares
 */
const handleControllerErrorAsync = (func) => async (req, res, next) => {
  try {
    await func(req, res, next);
  } catch (error) {
    next(error);
  }
};

/**
 * Expose routes
 */
module.exports = function (app) {
  app.get('/_modelName_/', handleControllerErrorAsync(_controllerName_.list));
  app.get('/_modelName_/:id', handleControllerErrorAsync(_controllerName_.show));
  app.get('/_modelName_/p/paginate', handleControllerErrorAsync(_controllerName_.paginate));
  app.post('/_modelName_/', handleControllerErrorAsync(_controllerName_.create));
  app.put('/_modelName_/:id', handleControllerErrorAsync(_controllerName_.update));
  app.delete('/_modelName_/:id', handleControllerErrorAsync(_controllerName_.remove));

  /**
   * Handle errorr
   */
  app.use(function (err, req, res, next) {
    console.log('error from controller handled by global error handler');
  });
};
