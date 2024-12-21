let tasks = [
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

  Mutation: {
    createTask: (_, { input }) => {
      const newTask = { id: `ID-${tasks.length + 1}`, ...input };

      tasks.push(newTask);

      return newTask;
    },

    updateTask: (_, { id, input }) => {
      const index = tasks.findIndex((task) => task.id === id);

      if (index === -1) {
        throw new Error("Task not found");
      }

      tasks[index] = { ...tasks[index], ...input };

      return tasks[index];
    },

    deleteTask: (_, { id }) => {
      const index = tasks.findIndex((task) => task.id === id);

      if (index === -1) {
        throw new Error("Task not found");
      }

      tasks.splice(index, 1);

      return "Task deleted successfully";
    },
  },
};

export default resolvers;
