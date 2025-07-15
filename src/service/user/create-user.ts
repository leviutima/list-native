import { api } from "../api";

export const createUser = async(data: {}) => {
    try{
        const res = await api.post(`/user`, data)
        return res.data
    }catch(err: any) {
        console.log(err);
    }
}