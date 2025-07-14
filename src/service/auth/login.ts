import { api } from "../api";

export type LoginData = {
  email: string;
  password: string;
};

export const login = async (data: LoginData) => {
  try{
  const res = await api.get(`/user`, {
    params: {
      email: data.email,
      password: data.password,
    },
  });
  if (res.data.length === 0) {
    throw new Error("Email ou senha inválidos");
  }
  return res.data[0]; 
  } catch(err) {
    console.log("erro:", err);
    throw err;
  }

};
