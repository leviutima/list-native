import { api } from "../api";

export const patchFinishedTask = async (taskId: string, finished: boolean) => {
  try {
    const res = await api.patch(`/task/${taskId}`, {
      finished,
    });
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro da API ao marcar tarefa como finalizada:", error.response.data);
      throw new Error(error.response.data?.message || "Erro ao atualizar status da tarefa.");
    } else if (error.request) {
      console.error("Sem resposta da API ao atualizar tarefa:", error.request);
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      console.error("Erro inesperado ao atualizar tarefa:", error.message);
      throw new Error("Erro inesperado ao atualizar status da tarefa.");
    }
  }
};
