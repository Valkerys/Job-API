const { updateLogs } = require('../../../tools');
const { Tool } = require('../../models/Tool');

const getTools = () => Tool.find();

const getToolById = id => Tool.findById(id);

const createTool = async (name, quantity, description) => {
  console.log(name, quantity, description);
  const dateAdded = new Date();
  const tool = new Tool({
    name,
    dateAdded,
    quantity,
    description,
    inUse: false
  });
  await tool.save();
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
      name, quantity, description
    }) => createTool(name, quantity, description),
  }
};

module.exports.toolResolvers = toolResolvers;
