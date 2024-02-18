import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'
import styles from './Home.module.css'
import { useGetEmployees } from '../../api/api.ts'
import Table from '../../components/Table/Table.tsx'
import { IEmployee } from '../../types/employee.ts'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import FilterBox from '../../components/FilterBox/FilterBox.tsx'
import { IFilter } from '../../types/IFilter.ts'
import SearchBox from '../../components/SearchBox/SearchBox.tsx'
import { Gender, Position, Technology } from '../../types/types.ts'

const Home = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const getLabel = (filterKey: string, value: string) => {
        switch (filterKey) {
            case 'Position':
                return Position[value as keyof typeof Position]
            case 'Stack':
                return Technology[value as keyof typeof Technology]
            case 'Gender':
                return Gender[value as keyof typeof Gender]
            default:
                return value
        }
    }
    const getFiltersFromSearchParams = () => {
        return (
            Array.from(searchParams.entries()).flatMap(([key, value]) => {
                return value.split(',').map((v) => ({
                    filterKey: key,
                    value: v,
                    label: getLabel(key, v),
                }))
            }) ?? ([] as IFilter[])
        )
    }

    const [filters, setFilters] = useState<IFilter[]>(
        getFiltersFromSearchParams(),
    )
    const [params, setParams] = useState({
        page: 1,
        count: 10,
        filters: filters,
    })
    const navigate = useNavigate()
    const [response, error, loading] = useGetEmployees(params)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    const hasMoreData = response ? response?.length < params.count : false
    useEffect(() => {
        if (response) {
            if (params.page === 1) setEmployees(response)
            else setEmployees((employees) => [...employees, ...response])
        }
    }, [response])

    const handleFilterChange = (filter: IFilter) => {
        const newFilters = filters.filter((f) => f.value !== filter.value)
        if (!filters.some((f) => f.value === filter.value))
            newFilters.push(filter)
        setFilters(newFilters)
        setSearchParams((searchParams) => {
            const urlParams = new URLSearchParams(searchParams)
            if (
                newFilters.filter((f) => f.filterKey === filter.filterKey)
                    .length === 0
            )
                urlParams.delete(filter.filterKey)
            else
                urlParams.set(
                    filter.filterKey,
                    newFilters
                        .filter((f) => f.filterKey === filter.filterKey)
                        .map((f) => f.value)
                        .join(','),
                )
            return urlParams
        })
    }
    const handleQueryChange = (query: string) => {
        setFilters((filters) => {
            const newFilters = filters.filter((f) => f.filterKey !== 'name')
            newFilters.push({
                filterKey: 'name',
                value: query,
                label: 'Имя',
            })
            return newFilters
        })
        setSearchParams((searchParams) => {
            const params = new URLSearchParams(searchParams)
            if (query === '') params.delete('name')
            else params.set('name', query)
            return params
        })
    }

    // infinite scroll
    const observer = useRef<IntersectionObserver | null>(null)
    const lastEmployeeRef = useCallback(
        (node: Element) => {
            const loadMore = () => {
                if (response) setParams((p) => ({ ...p, page: p.page + 1 }))
            }
            if (loading) return
            if (observer.current) observer.current.disconnect()
            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && !hasMoreData) loadMore()
            })
            if (node) observer.current.observe(node)
        },
        [loading, response, hasMoreData],
    )

    // breadcrumbs
    const breadcrumbs = [
        {
            name: 'Главная',
            link: '/',
        },
        {
            name: 'Список сотрудников',
            link: '/',
        },
    ]

    // table columns
    const columns = [
        { key: 'name', label: 'ФИО' },
        { key: 'position', label: 'Должность' },
        { key: 'phone', label: 'Телефон' },
        { key: 'birthdate', label: 'Дата рождения' },
    ]
    if (error) return <div>{error.message ?? error}</div>
    return (
        <main className={styles.main}>
            <Breadcrumbs links={breadcrumbs} />
            <SearchBox
                setQuery={handleQueryChange}
                query={filters.find((f) => f.filterKey === 'name')?.value ?? ''}
                handleFilterChange={handleFilterChange}
                filters={filters}
            />
            <FilterBox
                filterRemoveCallback={(f) => {
                    handleFilterChange(f)
                }}
                filters={filters.filter((f) => f.filterKey !== 'name')}
                findCallback={() => {
                    setParams((p) => ({
                        ...p,
                        page: 1,
                        filters: filters,
                    }))
                }}
            />
            <Table
                columns={columns}
                rows={employees}
                onRowClick={(row) => navigate(`/employee/${row.id}`)}
                lastRowRef={
                    lastEmployeeRef as unknown as RefObject<HTMLTableRowElement>
                }
            />
        </main>
    )
}

export default Home
