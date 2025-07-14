import { api } from "../api";

export const getUniqueUser = async(userId: string) => {
    try{
        const res = await api.get(`/task?userId=${userId}`)
        return res.data
    }catch(err: any) {
        console.log(err);
        throw new Error(err?.response?.data?.message || "Erro desconhecido");
    }
}