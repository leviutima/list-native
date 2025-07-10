import React, { createContext, useState, ReactNode } from "react";

type Task = {
  id: string;
  title: string;
  description: string;
  urgent: boolean;
  pending: boolean;
  optional: boolean;
};

type TaskContextType = {
  tasks: Task[];
  addTask: (task: Omit<Task, "id">) => void;
};

export const TaskContext = createContext<TaskContextType>({
  tasks: [],
  addTask: () => {},
});

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);

  function addTask(task: Omit<Task, "id">) {
    const newTask = { ...task, id: Math.random().toString(36) };
    setTasks((oldTasks) => [...oldTasks, newTask]);
  }

  return (
    <TaskContext.Provider value={{ tasks, addTask }}>
      {children}
    </TaskContext.Provider>
  );
}
