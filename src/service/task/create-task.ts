import { api } from "../api";


export const createTask = async (data: {}) => {
  try {
    const res = await api.post(`/task`, data);
    return res.data;
  } catch (error: any) {
    if (error.response) {
      console.error("Erro da API:", error.response.data);
      throw new Error(error.response.data?.message || "Erro ao criar tarefa.");
    } else if (error.request) {
      console.error("Sem resposta da API:", error.request);
      throw new Error("Servidor não respondeu. Verifique sua conexão.");
    } else {
      console.error("Erro inesperado:", error.message);
      throw new Error("Erro inesperado ao criar tarefa.");
    }
  }
};
