import { api } from "../api";

export const getTasksByUser = async (userId: string) => {
  try {
    const response = await api.get(`/task?userId=${userId}`);
    console.log("Tarefas encontradas:", response.data);
    return response.data;
  } catch (err: any) {
    console.error("Erro ao buscar tarefas:", err);
    throw new Error("Erro ao buscar tarefas");
  }
};
