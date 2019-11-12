const { checkKey } = require('../main/controllers/api-tools/check-key');
const { checkQuery } = require('../main/controllers/api-tools/check-query');
const { updateLogs } = require('../main/controllers/tools/update.logs');

module.exports = {
  checkKey,
  checkQuery,
  updateLogs,
};
