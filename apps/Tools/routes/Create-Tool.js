// libraries
const { graphql } = require('graphql');
const express = require('express');
// middleware and query checking method
const { checkKey } = require('../../tools');
// GraphQL typedefs (schema) and resolvers (methods)
const { userResolvers } = require('../controllers/resolvers/user.resolvers');
const { userTypedefs } = require('../controllers/typeDefs/user.typedefs');

const router = express.Router();

// declaring the method
let createTool;

// declaring the route - adding it
router.post('/create', checkKey, async (req, res) => createTool(req.body, res));


createTool = async (body, res) => {
  // get the parameters
  const {
    name, dateAdded, quantity, toolId, inUse
  } = body;


  // enter the function to create the user
  await createToolAccount(
    name,
    quantity,
    description
  );

  // send a success reponse
  res.send({
    status: 'success'
  });
};

module.exports.routes = router;

// Create the user.
createToolAccount = async (
  name, quantity, description
) => {
  // in the mutation functions, create a user
  await userResolvers.Mutation.createTool({
    name,
    quantity,
    description
  });
  // return the account was successfully created
  return true;
};
