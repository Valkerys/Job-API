// Check the key
module.exports.checkQuery = (result, res) => {
  if (result === null || result === undefined) {
    res.send({
      status: 'failure',
      reason: 'bad query'
    });
    return true;
  }
  return false;
};
