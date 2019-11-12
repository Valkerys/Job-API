const { dbs } = require('../../configs');

module.exports.Tool = dbs.db1().model('Tool', {
  name: String,
  dataAdded: Date,
  quantity: Number,
  quantityCheckedOut: Number,
  checkoutList: [{
    userId: String,
    username: String,
    firstName: String,
    lastName: String,
    dateCheckedOut: Date,
    dateCheckedIn: Date,
  }],
  logs: [{
    time: Date,
    message: String,
  }]
});
