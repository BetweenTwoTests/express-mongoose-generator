'use strict';

/**
 * Module Dependencies
 */

const companyController = require('../app/controllers/companyController');

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
  app.get('/company/', handleControllerErrorAsync(companyController.list));
  app.get('/company/:id', handleControllerErrorAsync(companyController.show));
  app.get('/company/p/paginate', handleControllerErrorAsync(companyController.paginate));
  app.post('/company/', handleControllerErrorAsync(companyController.create));
  app.put('/company/:id', handleControllerErrorAsync(companyController.update));
  app.delete('/company/:id', handleControllerErrorAsync(companyController.remove));

  /**
   * Handle errorr
   */
  app.use(function (err, req, res, next) {
    console.log('error from controller handled by global error handler');
  });
};
