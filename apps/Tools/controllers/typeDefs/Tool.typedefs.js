const { buildSchema } = require('graphql');

const defs = `
    scalar Date
    scalar JSON

    scalar Checkout {
        userId: String
        username: String
        firstName: String
        lastName: String
        dateCheckedOut: Date
        dateCheckedIn: Date
    }

    scalar Log {
        time: Date
        message: String
    }

    type Tool {
        id: ID!
        name: String
        dataAdded: Date
        quantity: Int
        quantityCheckedOut: Int
        checkoutList: [Checkout]
        logs: [Log]
    }

    type Query {
        getTools: [Tool!]!
        getToolById(id: ID!): Tool
    }

    type Mutation {
        createTool(name: String!, quantity: Int!): Tool!
    }
`;

module.exports.toolTypedefs = buildSchema(`${defs}`);
