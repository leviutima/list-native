import { api } from "../api";

export const putTask = async (id: string, data: {}) => {
  try {
    const res = await api.put(`/task/${id}`, data);
    return res.data;
  } catch (err: any) {
    console.log(err);
  }
};
