import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'
import styles from './Home.module.css'
import { useGetEmployees } from '../../api/api.ts'
import Table from '../../components/Table/Table.tsx'
import { IEmployee } from '../../types/employee.ts'
import { useNavigate } from 'react-router-dom'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import FilterBox from '../../components/FilterBox/FilterBox.tsx'
import { IFilter } from '../../types/IFilter.ts'
import SearchBox from '../../components/SearchBox/SearchBox.tsx'

const Home = () => {
    const [params, setParams] = useState({
        page: 1,
        count: 10,
    })
    const navigate = useNavigate()
    const [filters, setFilters] = useState<IFilter[]>([])
    const [isLastPage, setIsLastPage] = useState(false)
    const [response, error, loading] = useGetEmployees(params)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    useEffect(() => {
        if (!isLastPage) {
            if (response) setEmployees((e) => [...e, ...response])
            if (response?.length === 0) {
                setIsLastPage(true)
                setParams((p) => ({ ...p, page: p.page - 1 }))
            }
        }
    }, [isLastPage, response])

    const handleFilterChange = (filter: IFilter) => {
        setFilters((filters) => {
            const newFilters = filters.filter((f) => f.value !== filter.value)
            if (filters.some((f) => f.value === filter.value)) return newFilters
            else newFilters.push(filter)
            return newFilters
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
                if (entries[0].isIntersecting && !isLastPage) loadMore()
            })
            if (node) observer.current.observe(node)
        },
        [loading, response, isLastPage],
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
    if (error) return <div>Error</div>
    if (loading) return <div>Loading...</div>
    return (
        <main className={styles.main}>
            <Breadcrumbs links={breadcrumbs} />
            <SearchBox
                setQuery={handleQueryChange}
                handleFilterChange={handleFilterChange}
                filters={filters}
            />
            <FilterBox
                filterRemoveCallback={(f) => {
                    setFilters((filters) =>
                        filters.filter((filter) => filter !== f),
                    )
                }}
                filters={filters}
                findCallback={() => {
                    setIsLastPage(false)
                    setEmployees([])
                    setParams((p) => ({
                        ...p,
                        page: 1,
                        filters: filters,
                    }))
                }}
            />
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    rows={employees}
                    onRowClick={(row) => navigate(`/employee/${row.id}`)}
                    lastRowRef={
                        lastEmployeeRef as unknown as RefObject<HTMLTableRowElement>
                    }
                />
            )}
        </main>
    )
}

export default Home
