import { api } from "../api";

export const updateTask = async (id: string, data: {}) => {
  try {
    const res = await api.put(`/task/${id}`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro da API ao atualizar tarefa:", error.response.data);
      throw new Error(error.response.data?.message || "Erro ao atualizar a tarefa.");
    } else if (error.request) {
      console.error("Sem resposta da API ao atualizar tarefa:", error.request);
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      console.error("Erro inesperado ao atualizar tarefa:", error.message);
      throw new Error("Erro inesperado ao atualizar a tarefa.");
    }
  }
};
