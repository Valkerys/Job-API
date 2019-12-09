
const express = require('express');

const GetTool = require('./Get-Tool');
const CreateTool = require('./Create-Tool');

const router = express.Router();

router.use('/', GetTool.routes);
router.use('/', CreateTool.routes);

module.exports.routes = router;


///////////////////////////////////////////
