import { useAxios } from '../hooks/useAxios.ts'
import { IEmployee } from '../types/employee.ts'

type GetEmployeesParams = {
    page: number
    count: number
    name?: string
    gender?: string
    position?: string
    stack?: string[]
}

export const useGetEmployees = (params: GetEmployeesParams) => {
    return useAxios<IEmployee[]>({ url: 'Employee', params })
}

type GetEmployeeByIdParams = {
    id: number
}
export const useGetEmployeeById = (params: GetEmployeeByIdParams) => {
    return useAxios({ url: `employees/${params.id}`, params })
}
