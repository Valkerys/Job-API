const { getLogMessage } = require('./logMessages');

const models = {
  Tool: require('../../../apps/Tools/tool_exports'),
}

let updateLogs;

module.exports.updateLogs = async (
  id, model, type, messageNumber, logValue
) => updateLogs(id, model, type, messageNumber, logValue);

updateLogs = (id, model, type, messageNumber, logValue) => {
  let logVal = '';
  if (logValue !== undefined) {
    logVal = logValue;
  }

  const newDate = new Date();
  const date = newDate.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric'
  });
  const val = {
    time: newDate,
    message: `${date} | ${getLogMessage[type.toLowerCase()][messageNumber]}${logValue}`
  };
  const result = await models[model].findByIdAndUpdate(id,
    { $push: { logs: { $each: [val], $sort: -1 } } },
    { new: true })
    .then(r => r);
  return result;
};
