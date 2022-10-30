'use strict';

/**
 * Module dependencies.
 */

const mongoose = require('mongoose');
const CompanyModel = mongoose.model('Company');

/**
 * Company tag & component
 *
 * @openapi
 * tags:
 *   - name: company
 *     description: company description
 *
 * components:
 *  schemas:
 *    NewCompany:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: name
 *          example: lorem ipsum
 *    UpdateCompany:
 *      type: object
 *      properties:
 *         name:
 *            type: string
 *            description: name
 *            example: lorem ipsum
 *    Company:
 *      allOf:
 *        - type: object
 *          properties:
 *            id:
 *              type: string
 *              description: The Company model ObjectID.
 *        - $ref: '#/components/schemas/NewCompany'
 */

/**
 * @openapi
 * /company/:
 *   get:
 *     tags:
 *       - company
 *     summary: Returns a list of company objects
 *     description: Get all company objects.
 *
 *     responses:
 *      '200':
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Company'
 *      '500':
 *        description: Error
 */
exports.list = async (req, res) => {
  console.log('list all Company');

  let companys = await CompanyModel.find({}).exec();
  return res.json(companys);
};

/**
 * @openapi
 * /company/{id}:
 *   get:
 *     tags:
 *       - company
 *     summary: Find Company by id
 *     description: Returns a single Company
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Company ObjectID to delete
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
 *                $ref: '#/components/schemas/Company'
 *      '404':
 *        description: Not Found
 */
exports.show = async (req, res) => {
  console.log('find a Company');

  let id = req.params.id;

  let company = await CompanyModel.findOne({ _id: id }).exec();

  return res.json(company);
};

/**
 * @openapi
 * /company/:
 *   post:
 *     tags:
 *       - company
 *     summary: Create a new company
 *     description: Create a new company.
 *     requestBody:
 *       description: Create a new company using the following contents.
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Company'
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Company'
 *       '405':
 *         description: Invalid input
 */
exports.create = async (req, res) => {
  console.log('create Company');

  let company = new CompanyModel({
    name: req.body.name,
    nuae: req.body.nuae,
  });

  company = await company.save();

  return res.status(201).json(company);
};

/**
 * @openapi
 * /company/{id}:
 *   put:
 *     tags:
 *       - company
 *     summary: Update a company
 *     description: Update an existing company
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Company ObjectID to delete
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Update an existent company
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateCompany'
 *       required: true
 *     responses:
 *       '200':
 *         description: Successful operation
 *         content:
 *           application/json:
 *             schmea:
 *               $ref: '#/components/schemas/Company'
 *       '500':
 *         description: Error
 */
exports.update = async (req, res) => {
  console.log('update Company');

  let id = req.params.id;
  let company;

  company = await CompanyModel.findOne({ _id: id }).exec();

  company.name = req.body.name ? req.body.name : company.name;
  company.nuae = req.body.nuae ? req.body.nuae : company.nuae;

  company = await company.save();
  return res.json(company);
};

/**
 * @openapi
 * /company/{id}:
 *   delete:
 *     tags:
 *       - company
 *     summary: Delete a company
 *     description: Delete an existing company
 *     parameters:
 *       - name: id
 *         in: path
 *         description: Company ObjectID to delete
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

  await CompanyModel.findByIdAndRemove(id).exec();
  return res.status(204).json();
};

exports.paginate = async (req, res) => {
  // destructure page and limit and set default values
  const { page = 1, limit = 10 } = req.query;

  // execute query with page and limit values
  const companys = await CompanyModel.find()
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .exec();

  // return response with company and current page
  res.json({
    companys,
    currentPage: page,
  });
};
