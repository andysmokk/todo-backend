import { v4 as uuidv4 } from "uuid";
import { ApolloError } from "apollo-server-errors";

import { Task, TaskInput } from "../types";
import taskInputSchema from "../validation/taskInputSchema";

let tasks: Task[] = [];

const resolvers = {
  Query: {
    getAllTasks: () => tasks,
    getTaskById: (_: any, { id }: { id: string }) => {
      const task = tasks.find((task) => task.id === id);
      if (!task) {
        throw new Error(`Task not found.`);
      }
      return task;
    },
  },

  Mutation: {
    createTask: (_: any, { input }: { input: TaskInput }) => {
      try {
        const updatedInput = {
          ...input,
          completed: false,
        };

        taskInputSchema.parse(updatedInput);

        const newTask = {
          id: uuidv4(),
          ...updatedInput,
        };

        tasks.push(newTask);

        return newTask;
      } catch (error: any) {
        if (error.errors) {
          throw new ApolloError("Validation failed", "403", {
            details: error.errors.map((e: any) => ({
              path: e.path,
              message: e.message,
            })),
          });
        }

        throw new ApolloError("Internal Server Error", "500");
      }
    },

    updateTask: (_: any, { id, input }: { id: string; input: TaskInput }) => {
      const currentIndexTask = tasks.findIndex((task) => task.id === id);

      console.log(tasks[currentIndexTask]);

      if (currentIndexTask === -1) {
        throw new Error("Task not found");
      }

      try {
        taskInputSchema.parse(input);
      } catch (error: any) {
        if (error.errors) {
          throw new ApolloError("Validation failed", "403", {
            details: error.errors.map((e: any) => ({
              path: e.path,
              message: e.message,
            })),
          });
        }

        throw new ApolloError("Internal Server Error", "500");
      }

      tasks[currentIndexTask] = { ...tasks[currentIndexTask], ...input };

      return tasks[currentIndexTask];
    },

    deleteTask: (_: any, { id }: { id: string }) => {
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
