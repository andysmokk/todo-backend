import gql from "graphql-tag";

const typeDefs = gql`
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    dueDate: String!
  }

  type Query {
    getAllTasks: [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    createTask(input: TaskInput!): Task
    updateTask(id: ID!, input: TaskInput!): Task
    deleteTask(id: ID!): String
  }

  input TaskInput {
    title: String!
    description: String
    completed: Boolean!
    dueDate: String!
  }
`;

export default typeDefs;
