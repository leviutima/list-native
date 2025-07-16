export interface UserProps {
    id: string,
    name: string,
    surname: string,
    email: string,
    password: string
}
export interface Subtask {
  id: string;
  title: string;
  finished: boolean;
}

export type TaskStatus = "URGENT" | "PENDING" | "OPTIONAL";

export interface Task {
  id: string;
  userId: string;
  title: string;
  description: string;
  status: TaskStatus;
  finished: boolean;
  subtasks: Subtask[];
}