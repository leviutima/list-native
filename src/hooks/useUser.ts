import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getUser } from "../service/user/get-user"

type User = {
  id: string
  name: string
  email: string
}

export const useUsers = () => {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => getUser(),
  })
}
