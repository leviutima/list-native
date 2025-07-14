import { api } from "../api";

export const getTask = async () => {
  try {
    const res = await api.get(`/task`);
    return res.data;
  } catch (err: any) {
    console.log(err);
    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
};
