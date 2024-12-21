const tasks = [
  {
    id: "ID-1",
    title: "The Awakening",
    description: "Kate Chopin",
    completed: false,
    dueDate: "2021-07-01",
  },
  {
    id: "ID-2",
    title: "City of Glass",
    description: "Paul Auster",
    completed: false,
    dueDate: "2021-07-02",
  },
];

const resolvers = {
  Query: {
    getAllTasks: () => tasks,
    getTaskById: (_, { id }) => tasks.find((task) => task.id === id),
  },
};

export default resolvers;
