import { api } from "../api";

export const getTasksByUser = async (userId: string) => {
  try {
    const response = await api.get(`/task?userId=${userId}`);
    console.log("Tarefas encontradas:", response.data);
    return response.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro da API ao buscar tarefas:", error.response.data);
      throw new Error(error.response.data?.message || "Erro ao buscar tarefas.");
    } else if (error.request) {
      console.error("Sem resposta da API ao buscar tarefas:", error.request);
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      console.error("Erro inesperado ao buscar tarefas:", error.message);
      throw new Error("Erro inesperado ao buscar tarefas.");
    }
  }
};
