'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const _modelNameCapitalized_Model = mongoose.model('_modelNameCapitalized_');

/**
 * _modelNameCapitalized_ tag & component
 *
 * @openapi
 * tags:
 *   - name: _modelName_
 *     description: _modelName_ description
 *
 * components:
 *  schemas:
 *    New_modelNameCapitalized_:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: this is an example property generated for reference. The generator will generateProperties will be generated based on Model (TODO).
 *          example: lorem ipsum
 *    Update_modelNameCapitalized_:
 *      type: object
 *      properties:
 *         name:
 *            type: string
 *            description: this is an example property generated for reference. The generator will generateProperties will be generated based on Model (TODO).
 *            example: lorem ipsum
 *    _modelNameCapitalized_:
 *      allOf:
 *        - type: object
 *          properties:
 *            id:
 *              type: string
 *              description: The _modelNameCapitalized_ model ObjectID.
 *        - $ref: '#/components/schemas/New_modelNameCapitalized_'
 */

/**
 * @openapi
 * /_modelName_/:
 *   get:
 *     tags:
 *       - _modelName_
 *     summary: Returns a list of _modelName_ objects
 *     description: Get all _modelName_ objects.
 *
 *     responses:
 *      '200':
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/_modelNameCapitalized_'
 *      '500':
 *        description: Error
 */
exports.list = async (req, res) => {
  console.log('list all _modelNameCapitalized_');

  let _modelName_s = await _modelNameCapitalized_Model.find({}).exec();
  return res.json(_modelName_s);
};

/**
 * @openapi
 * /_modelName_/{id}:
 *   get:
 *     tags:
 *       - _modelName_
 *     summary: Find _modelNameCapitalized_ by id
 *     description: Returns a single _modelNameCapitalized_
 *     parameters:
 *       - name: id
 *         in: path
 *         description: _modelNameCapitalized_ ObjectID to find
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *      '200':
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              schema:
 *                $ref: '#/components/schemas/_modelNameCapitalized_'
 *      '404':
 *        description: Not Found
 */
exports.show = async (req, res) => {
  console.log('find a _modelNameCapitalized_');

  let id = req.params.id;

  let _modelName_ = await _modelNameCapitalized_Model.findOne({ _id: id }).exec();

  return res.send(_modelName_);
};

/**
 * @openapi
 * /_modelName_/:
 *   post:
 *     tags:
 *       - _modelName_
 *     summary: Create a new _modelName_
 *     description: Create a new _modelName_.
 *     requestBody:
 *       description: Create a new _modelName_ using the following contents.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/_modelNameCapitalized_'
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/_modelNameCapitalized_'
 *       '405':
 *         description: Invalid input
 */
exports.create = async (req, res) => {
  console.log('create _modelNameCapitalized_');

  let _modelName_ = new _modelNameCapitalized_Model({
    _createFields_,
  });

  _modelName_ = await _modelName_.save();

  return res.status(201).send(_modelName_);
};

/**
 * @openapi
 * /_modelName_/{id}:
 *   put:
 *     tags:
 *       - _modelName_
 *     summary: Update a _modelName_
 *     description: Update an existing _modelName_
 *     parameters:
 *       - name: id
 *         in: path
 *         description: _modelNameCapitalized_ ObjectID to find
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update an existent _modelName_
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Update_modelNameCapitalized_'
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schmea:
 *               $ref: '#/components/schemas/_modelNameCapitalized_'
 *       '500':
 *         description: Error
 */
exports.update = async (req, res) => {
  console.log('update _modelNameCapitalized_');

  let id = req.params.id;
  let _modelName_;

  _modelName_ = await _modelNameCapitalized_Model.findOne({ _id: id }).exec();

  _updateFields_;

  _modelName_ = await _modelName_.save();
  return res.send(_modelName_);
};

/**
 * @openapi
 * /_modelName_/{id}:
 *   delete:
 *     tags:
 *       - _modelName_
 *     summary: Delete a _modelName_
 *     description: Delete an existing _modelName_
 *     parameters:
 *       - name: id
 *         in: path
 *         description: _modelNameCapitalized_ ObjectID to
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '204':
 *         description: Successful operation
 *       '500':
 *         description: Error
 */
exports.remove = async (req, res) => {
  let id = req.params.id;

  await _modelNameCapitalized_Model.findByIdAndRemove(id).exec();

  return res.status(204).send();
};

/**
 * @openapi
 * /_modelName_/p/paginate:
 *   get:
 *     tags:
 *       - _modelName_
 *     summary: Paginate companies
 *     description: Returns a list of _modelNameCapitalized_, paginated
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         default: 1
 *         description: page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         default: 10
 *         description: limit per page
 *     responses:
 *       '200':
 *         description: successful operation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/_modelNameCapitalized_'
 *       '500':
 *         description: Error
 */
exports.paginate = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  // execute query with page and limit values
  const _modelName_s = await _modelNameCapitalized_Model
    .find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // return response with _modelName_ and current page
  res.send({
    _modelName_s,
    currentPage: page,
  });
};
