import { api } from "../api"

export const deleteTask = async(id: string) => {
    try{
        const res = await api.delete(`/task/${id}`,)
        return res.data
    }catch (err: any) {
    if (err instanceof Error) {
      console.error("Erro ao deletar tarefa:", err.message);
      throw new Error("Erro ao deletar tarefa: " + err.message);
    } else {
      console.error("Erro desconhecido ao deletar tarefa");
      throw new Error("Erro desconhecido ao deletar tarefa");
    }
  }
}