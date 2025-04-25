import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createEmployee } from "../api/employees"

export const useCreateEmployee = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: createEmployee,
    onSuccess: (newEmployee) => {
      queryClient.setQueryData(["employees"], (old) =>
        old ? [...old, newEmployee] : [newEmployee]
      )
    },
  })
}
