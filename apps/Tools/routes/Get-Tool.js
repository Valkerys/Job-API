// libraries
const { graphql } = require('graphql');
const express = require('express');
// middleware and query checking method
const { checkKey, checkQuery } = require('../../tools');
// GraphQL typedefs (schema) and resolvers (methods)
const { userResolvers } = require('../controllers/resolvers/user.resolvers');
const { userTypedefs } = require('../controllers/typeDefs/user.typedefs');

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

// Get the User by its ID
getToolById = async (body, res) => {

  // make the GraphQL query
  const result = await graphql(userTypedefs,
    `{ getToolById(id: "${body.id}") { ${values} } }`,
    userResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  res.send(result.getToolById);
};

// Get the User by its Username
getToolByName = async (body, res) => {

  // make the GraphQL query
  const result = await graphql(userTypedefs,
    `{ getToolByName(name: "${body.name}") { ${values} } }`,
    userResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  result.getToolByName.password = undefined;
  res.send(result.getToolByName);
};

// Get the User by its Email
getToolByInUse = async (body, res) => {
  // remove 'password' if included from the values param
  const values = removePasswordQuery(body.values);

  // make the GraphQL query
  const result = await graphql(userTypedefs,
    `{ getToolByInUse(email: "${body.inuse}") { ${values} } }`,
    userResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  result.getToolByInUse.password = undefined;
  res.send(result.getToolByInUse);
};

// Get all of the Users
getTools = async (body, res) => {
  // remove 'password' if included from the values param
  const values = removePasswordQuery(body.values);

  // make the GraphQL query
  const result = await graphql(userTypedefs,
    `{ getTools { ${values} } }`,
    userResolvers.Query).then(response => response.data);

  // check the query for null or undefeined
  // I.E not found
  if (checkQuery(result, res)) {
    return;
  }
  res.send(result.getTools);
};

module.exports.routes = router;
