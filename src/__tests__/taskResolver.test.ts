import resolvers from "../schema/resolvers";
let tasks: any[] = [];

beforeEach(() => {
  tasks = [];
});

test("should create a task successfully with valid input", () => {
  const input = {
    title: "Complete project",
    description: "Finish the GraphQL API implementation",
    dueDate: "2024-12-31",
    completed: false,
  };

  const result = resolvers.Mutation.createTask(null, { input });

  expect(result).toEqual({
    id: expect.any(String),
    title: "Complete project",
    description: "Finish the GraphQL API implementation",
    completed: false,
    dueDate: "2024-12-31",
  });
});

test("should throw a validation error for invalid dueDate", () => {
  const input = {
    title: "Invalid date task",
    description: "Testing invalid date",
    dueDate: "not-a-date",
    completed: false,
  };

  expect(() => {
    resolvers.Mutation.createTask(null, { input });
  }).toThrow(new Error("Validation failed"));
});

test("should throw a validation error for missing title", () => {
  const input = {
    title: "",
    description: "No title provided",
    dueDate: "2024-12-31",
    completed: false,
  };

  expect(() => {
    resolvers.Mutation.createTask(null, { input });
  }).toThrow(new Error("Validation failed"));
});
