import { api } from "../api";

export const patchFinishedTask = async (taskId: string, finished: boolean) => {
  try {
    const res = await api.patch(`/task/${taskId}`, {
      finished,
    });
    return res.data;
  } catch (err: any) {
    console.error("Erro ao atualizar tarefa:", err);
    throw err;
  }
};
