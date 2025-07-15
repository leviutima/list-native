import { api } from "../api";

export const updateUser = async(data: {}, id: string) => {
    try{
        const res = await api.put(`/user/${id}`, data)
        return res.data
    }catch(err: any) {
        console.log(err);
        
    }
}