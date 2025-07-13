import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { getUser } from "../service/user/get-user"
import { getUniqueUser } from "../service/user/get-unique-user"

type User = {
  id: string
  name: string
  surname: string,
  email: string
}

export const useUser = (id: string) => {
  return useQuery<User>({
    queryKey: ["user", id],
    queryFn: () => getUniqueUser(id),
    enabled: !!id, 
  });
}
