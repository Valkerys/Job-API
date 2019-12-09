
const express = require('express');

const GetTool = require('./Get-Tool');
const CreateTool = require('./Create-Tool');

const router = express.Router();

router.use('/', GetTool.routes);
router.use('/', CreateTool.routes);

module.exports.routes = router;


///////////////////////////////////////////

const { graphql } = require('graphql');
const express = require('express');
const { checkKey } = require('../../tools');
const { toolResolvers } = require('../controllers/resolvers/tool.resolvers');
const { toolTypedefs } = require('../controllers/typeDefs/tool.typedefs');

let graphQL;

router.get('/', checkKey, async (req, res) => graphQL(req.body, res));

graphQL = async (body, res) => {
  const { query } = body;

  let resolversType = 'Query';
  if (query.includes('mutation')) {
    resolversType = 'Mutation';
  }
  
  const result = await graphql(toolTypedefs,
    query,
    toolResolvers[resolversType]).then(response => response.data);

    res.send(result);
};

module.exports.routes = router;
