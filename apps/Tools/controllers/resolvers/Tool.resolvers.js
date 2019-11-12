const { updateLogs } = require('../../../tools');
const { Tool } = require('../../models/Tool');

const getTools = () => Tool.find();

const getToolById = id => Tool.findById(id);

const createTool = async (name, quantity) => {
  const dateAdded = new Date();
  const tool = new Tool({
    name,
    quantity,
    dateAdded,
    quantityCheckedOut: 0,
    checkoutList: [],
    logs: [],
  });
  await tool.save();
  await updateLogs(tool._id, 'Tool', 'tool', 1, name);
  return tool;
};

// Functions condenced to be exported
const toolResolvers = {
  Query: {
    getTools: () => getTools(),
    getToolById: ({ id }) => getToolById(id)
  },
  Mutation: {
    createTool: async ({
      name, quantity
    }) => createTool(name, quantity),
  }
};

module.exports.toolResolvers = toolResolvers;
