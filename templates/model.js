'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * _modelNameCapitalized_ Schema
 */
// eslint-disable-next-line prettier/prettier
const _schemaName_ = new Schema(
    _fields_
);

/**
 * Validations
 */

/**
 * Virtuals
 */

/**
 * Methods
 */
_schemaName_.methods = {
  hello_world: function () {
    console.log('Hello world from _modelNameCapitalized_ model methods');
  },
};

/**
 * Statics
 */
_schemaName_.statics = {
  hello_world: function () {
    console.log('Hello world from _modelNameCapitalized_ model statics');
  },
};

module.exports = mongoose.model('_modelNameCapitalized_', _schemaName_);
