import { api } from "../api";

export const updateTask = async (id: string, data: {}) => {
  try {
    const res = await api.put(`/task/${id}`, data);
    return res.data;
  } catch (err: any) {
     console.error("Erro ao atualizar tarefa:", err?.response?.data || err.message);
    throw err;
  }
};
