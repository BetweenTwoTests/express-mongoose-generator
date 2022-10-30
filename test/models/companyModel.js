'use strict';

/**
 * Module dependencies
 */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Company Schema
 */

const CompanySchema = new Schema({
  name: { type: String },
});

/**
 * Validations
 */

/**
 * Virtuals
 */

/**
 * Methods
 */
CompanySchema.methods = {
  hello_world: function () {
    console.log('Hello world from Company model methods');
  },
};

/**
 * Statics
 */
CompanySchema.statics = {
  hello_world: function () {
    console.log('Hello world from Company model statics');
  },
};

module.exports = mongoose.model('Company', CompanySchema);
