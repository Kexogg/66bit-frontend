import { useEffect, useState } from 'react'

type response<T> = [T | null, Error | null, boolean]

/**
 * Отправляет запрос на сервер и возвращает ответ
 * @param url - адрес запроса
 * @param options - параметры запроса
 */
export const useFetch = <T>(
    url: string,
    options?: RequestInit,
): response<T> => {
    const [response, setResponse] = useState<T | null>(null)
    const [error, setError] = useState<Error | null>(null)
    const [loading, setLoading] = useState(true)
    if (!options)
        options = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        }
    useEffect(() => {
        fetch(url, options)
            .then((response) => response.json())
            .then((data) => setResponse(data as T | null))
            .catch((err: Error | unknown) => {
                setError(
                    err instanceof Error ? err : new Error('Unknown error'),
                )
            })
            .finally(() => {
                setLoading(false)
            })
    }, [url, options.method, options.body])
    return [response, error, loading]
}
