const os = require('os');

const allowedFieldsTypes = {
  string: 'String',
  number: 'Number',
  date: 'Date',
  boolean: 'Boolean',
};

/**
 * Format the fields for the model template
 * @param {array} fields fields input
 * @returns {string} formatted fields
 */
function getFieldsForModelTemplate(fields) {
  const lg = fields.length - 1;

  let modelFields = '{' + os.EOL;
  fields.forEach(function (field, index, array) {
    // eslint-disable-next-line prettier/prettier
    
    if (field.isArray) {
      if (field.reference in allowedFieldsTypes) {
        // this is an array of primitives
        modelFields += field.name + ': [ ' + allowedFieldsTypes[field.reference] + ' ]';
      } else {
        // this is an array of reference
        modelFields += field.name + ': [ ' + os.EOL + "{ type: Schema.Types.ObjectId, ref: '{ref}' }" + os.EOL + ']';
      }
    } else if (field.type !== 'objectId') {
      modelFields += field.name + ': { type : ' + allowedFieldsTypes[field.type] + '}';
    } else {
      modelFields += field.name + ": { type: Schema.Types.ObjectId, ref: '{ref}' }";
    }

    // If not last element, then add new line
    modelFields += lg > index ? ',' + os.EOL : os.EOL;

    // Replace any object refs
    modelFields = modelFields.replace(/{ref}/, field.reference);
  });
  modelFields += '}';

  return modelFields;
}

/**
 * Puts a word with the first letter capital
 * @param {string} str
 * @returns {string}
 */
function capitalizeFirstLetter(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

/**
 * Puts a word in the plural
 * @param {string} word
 * @returns {string}
 */
function pluralize(word) {
  return word + 's';
}

module.exports = {
  getFieldsForModelTemplate: getFieldsForModelTemplate,
  pluralize: pluralize,
  capitalizeFirstLetter: capitalizeFirstLetter,
};
