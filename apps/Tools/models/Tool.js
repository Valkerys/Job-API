const { dbs } = require('../../configs');

module.exports.Tool = dbs.db1().model('Tool', {
  name: String,
  dateAdded: Date,
  quantity: Number,
  description: String,
  inUse: Boolean
});
