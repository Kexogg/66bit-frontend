import { IEmployee } from '../types/employee.ts'
import { IFilter } from '../types/IFilter.ts'
import { useFetch } from '../hooks/useFetch.ts'

const baseURL = 'https://frontend-test-api.stk8s.66bit.ru/api/'
type GetEmployeesParams = {
    page: number
    count: number
    filters?: IFilter[]
}

export const useGetEmployees = (params: GetEmployeesParams) => {
    const urlSearchParams = new URLSearchParams({
        page: params.page.toString(),
        count: params.count.toString(),
    })
    for (const filter of params.filters || []) {
        urlSearchParams.append(filter.filterKey, filter.value)
    }
    return useFetch<IEmployee[]>(
        `${baseURL}Employee?${urlSearchParams.toString()}`,
    )
}

type GetEmployeeByIdParams = {
    id: number
}
export const useGetEmployeeById = (params: GetEmployeeByIdParams) => {
    return useFetch<IEmployee>(`${baseURL}Employee/${params.id}`)
}
