import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { useEffect, useState } from 'react'

axios.defaults.baseURL = 'https://frontend-test-api.stk8s.66bit.ru/api/'

export const useAxios = <T, D = unknown>(
    axiosParams: AxiosRequestConfig<D>,
) => {
    const [response, setResponse] = useState<T | null>(null)
    const [error, setError] = useState<AxiosError | unknown>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios
            .request<T>(axiosParams)
            .then((result) => {
                setResponse(result.data)
            })
            .catch((err: AxiosError | unknown) => {
                if (axios.isAxiosError(err)) {
                    setError(err)
                } else {
                    setError(err)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }, [])

    return [response, error, loading]
}
