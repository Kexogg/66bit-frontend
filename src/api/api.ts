import { useAxios } from '../hooks/useAxios.ts'
import { IEmployee } from '../types/employee.ts'
import { useMemo } from 'react'

type GetEmployeesParams = {
    page: number
    count: number
    filters?: { key: string; value: string }[]
}

export const useGetEmployees = (params: GetEmployeesParams) => {
    const unpackedParams: { [key: string]: string | number } = {}
    Object.assign(unpackedParams, params)
    if (params.filters)
        params.filters.forEach((f) => {
            unpackedParams[f.key] = f.value
        })
    delete unpackedParams.filters
    const requestParams = useMemo(() => {
        return unpackedParams
    }, [params])
    return useAxios<IEmployee[]>({ url: 'Employee', params: requestParams })
}

type GetEmployeeByIdParams = {
    id: number
}
export const useGetEmployeeById = (params: GetEmployeeByIdParams) => {
    return useAxios<IEmployee>({ url: `Employee/${params.id}` })
}
