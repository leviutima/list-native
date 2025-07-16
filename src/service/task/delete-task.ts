import { api } from "../api"

export const deleteTask = async(id: string) => {
    try{
        const res = await api.delete(`/task/${id}`,)
        return res.data
    }catch(err: any) {
        console.log(err);
        throw Error
    }
}