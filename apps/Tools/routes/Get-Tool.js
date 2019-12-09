// libraries
const { graphql } = require('graphql');
const express = require('express');
// middleware and query checking method
const { checkKey, checkQuery } = require('../../tools');
// GraphQL typedefs (schema) and resolvers (methods)
const { toolResolvers } = require('../controllers/resolvers/Tool.resolvers');
const { toolTypedefs } = require('../controllers/typeDefs/Tool.typedefs');

const router = express.Router();

// declare the methods
let getToolById;
let getToolByName;
let getToolByInUse;
let getTools;

// decalre the routes
router.get('/id', checkKey, async (req, res) => getToolById(req.body, res));
router.get('/name', checkKey, async (req, res) => getToolByName(req.body, res));
router.get('/inuse', checkKey, async (req, res) => getToolByInUse(req.body, res));
router.get('/all', checkKey, async (req, res) => getTools(req.body, res));

// Get the Tool by its ID
getToolById = async (body, res) => {

  // make the GraphQL query
  const result = await graphql(toolTypedefs,
    `{ getToolById(id: "${body.id}") { ${values} } }`,
    toolResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  res.send(result.getToolById);
};

// Get the Tool by its name
getTools = async (body, res) => {
  console.log(body);
  const result = await toolResolvers.Query.getTools();

  res.send(result);
};

// Get the Tool by its use
getToolByInUse = async (body, res) => {

  // make the GraphQL query
  const result = await graphql(toolTypedefs,
    `{ getToolByInUse(email: "${body.inuse}") { ${values} } }`,
    toolResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  result.getToolByInUse.password = undefined;
  res.send(result.getToolByInUse);
};

// Get all of the Tools
getToolByName = async (body, res) => {
  // remove 'password' if included from the values param
  const values = removePasswordQuery(body.values);

  // make the GraphQL query
  const result = await graphql(toolTypedefs,
    `{ getTools { ${values} } }`,
    toolResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  res.send(result.getTools);
};

module.exports.routes = router;
