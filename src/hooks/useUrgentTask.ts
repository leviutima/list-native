import { useQuery } from "@tanstack/react-query";
import { getTasksByUser } from "../service/task/get-unique-task";

export const useUrgentTasks = (userId: string) => {
  return useQuery({
    queryKey: ["task", userId],
    queryFn: async () => {
      const tasks = await getTasksByUser(userId);
      return tasks.filter((task: any) => task.status === "URGENT");
    },
  });
};
