import axios from "axios";
import { api } from "../api";

export const getUser = async () => {
  try {
    const res = await api.get(`/user`);
    return res.data;
  } catch (err: any) {
    console.log(err);

    throw new Error(err?.response?.data?.message || "Erro desconhecido");
  }
};
