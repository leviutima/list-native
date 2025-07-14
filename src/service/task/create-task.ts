import { api } from "../api";



export const createTask = async (data: {}) => {
  try {
    const res = await api.post(`/task`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error("Erro ao criar tarefa");
  }
};
