/**
 * Module dependencies
 */
const ft = require('./fileTools');
const formatTools = require('./formatTools');
const os = require('os');

/**
 * Generate a Mongoose model
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateModel(path, modelName, modelFields, generateMethod, cb) {
  const fields = formatTools.getFieldsForModelTemplate(modelFields);
  const schemaName = formatTools.capitalizeFirstLetter(modelName) + 'Schema';

  let model = ft.loadTemplateSync('model.js');
  model = model.replace(/_modelNameCapitalized_/g, formatTools.capitalizeFirstLetter(modelName));
  model = model.replace(/_modelName_/g, modelName);
  model = model.replace(/_schemaName_/g, schemaName);
  model = model.replace(/_fields_/, fields);

  model = model.replace(/\/{2} eslint-disable-next-line prettier\/prettier/g, '');

  if (generateMethod === 't') {
    ft.createDirIfIsNotDefined(path, 'models', function () {
      ft.writeFile(path + '/models/' + modelName + 'Model.js', model, null, cb);
    });
  } else {
    ft.createDirIfIsNotDefined(path, modelName, function () {
      ft.writeFile(path + '/' + modelName + '/' + modelName + 'Model.js', model, null, cb);
    });
  }
}

/**
 * Generate a Express router
 * @param {string} path
 * @param {string} modelName
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateRouter(path, modelName, generateMethod, cb) {
  let router = ft.loadTemplateSync('router.js');
  router = router.replace(/_modelName_/g, modelName);
  router = router.replace(/_controllerName_/g, modelName + 'Controller');

  if (generateMethod === 't') {
    ft.createDirIfIsNotDefined(path, 'routes', function () {
      router = router.replace(/_controllerPath_/g, "'../app/controllers/" + modelName + "Controller'");
      ft.writeFile(path + '/routes/' + modelName + 'Routes.js', router, null, cb);
    });
  } else {
    ft.createDirIfIsNotDefined(path, modelName, function () {
      router = router.replace(/_controllerPath_/g, "'./" + modelName + "Controller'");
      ft.writeFile(path + '/' + modelName + '/' + modelName + 'Routes.js', router, null, cb);
    });
  }
}

/**
 * Generate Controller
 * @param {string} path
 * @param {string} modelName
 * @param {array} modelFields
 * @param {string} generateMethod
 * @param {function} cb
 */
function generateController(path, modelName, modelFields, generateMethod, cb) {
  let controller = ft.loadTemplateSync('controller.js');

  let updateFields = '';
  let createFields = os.EOL;

  modelFields.forEach(function (f, index, fields) {
    const field = f.name;

    updateFields += modelName + '.' + field + ' = req.body.' + field + ' ? req.body.' + field + ' : ' + modelName + '.' + field + ';';
    updateFields += os.EOL + '\t\t\t';

    createFields += '\t\t\t' + field + ' : req.body.' + field;
    createFields += fields.length - 1 > index ? ',' + os.EOL : '';
  });

  controller = controller.replace(/_modelNameCapitalized_/g, formatTools.capitalizeFirstLetter(modelName));
  controller = controller.replace(/_modelName_/g, modelName);
  controller = controller.replace(/_createFields_/g, createFields);
  controller = controller.replace(/_updateFields_/g, updateFields);

  if (generateMethod === 't') {
    ft.createDirIfIsNotDefined(path, 'controllers', function () {
      controller = controller.replace(/{modelPath}/g, "'../models/" + modelName + "Model'");
      ft.writeFile(path + '/controllers/' + modelName + 'Controller.js', controller, null, cb);
    });
  } else {
    ft.createDirIfIsNotDefined(path, modelName, function () {
      controller = controller.replace(/{modelPath}/g, "'./" + modelName + "Model'");
      ft.writeFile(path + '/' + modelName + '/' + modelName + 'Controller.js', controller, null, cb);
    });
  }
}

module.exports = {
  generateModel: generateModel,
  generateRouter: generateRouter,
  generateController: generateController,
};
