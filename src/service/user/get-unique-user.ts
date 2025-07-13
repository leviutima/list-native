import { api } from "../api";

export const getUniqueUser = async(id: string) => {
    try{
        const res = await api.get(`/user/${id}`)
        return res.data
    }catch(err: any) {
        console.log(err);
        throw new Error(err?.response?.data?.message || "Erro desconhecido");
    }
}