import { TaskStatus } from "./types";

export interface UserProps {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
}
export interface Subtask {
  title: string;
  finished: boolean;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  finished: boolean;
  subtasks: Subtask[];
}
