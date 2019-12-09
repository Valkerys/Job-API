const { dbs } = require('../../configs');

const schema = new Schema({
  name: String,
  dateAdded: Date,
  quantity: Number,
  toolId: Number,
  description: String,
  inUse: Boolean
});

module.exports.Tool = dbs.db1().model('Tool', schema);

// module.exports.Tool = dbs.db1().model('Tool', {
//   name: String,
//   dataAdded: Date,
//   quantity: Number,
//   quantityCheckedOut: Number,
//   checkoutList: [{
//     userId: String,
//     username: String,
//     firstName: String,
//     lastName: String,
//     dateCheckedOut: Date,
//     dateCheckedIn: Date,
//   }],
//   logs: [{
//     time: Date,
//     message: String,
//   }]
// });
