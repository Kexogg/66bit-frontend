import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'
import Dropdown from '../../components/Dropdown/Dropdown.tsx'
import styles from './Home.module.css'
import Searchbar from '../../components/Searchbar/Searchbar.tsx'
import Button from '../../components/Button/Button.tsx'
import Chip from '../../components/Chip/Chip.tsx'
import { useGetEmployees } from '../../api/api.ts'
import Table from '../../components/Table/Table.tsx'
import { IEmployee } from '../../types/employee.ts'
import { useNavigate } from 'react-router-dom'
import { RefObject, useCallback, useEffect, useRef, useState } from 'react'
import {
    genderToString,
    positionToString,
    technologyToString,
} from '../../types/types.ts'

type filter = {
    key: string
    value: string
}

const Home = () => {
    const [params, setParams] = useState({
        page: 1,
        count: 10,
    })
    const navigate = useNavigate()
    const [filters, setFilters] = useState<filter[]>([])
    const [isLastPage, setIsLastPage] = useState(false)
    const [response, error, loading] = useGetEmployees(params)
    const [employees, setEmployees] = useState<IEmployee[]>([])
    useEffect(() => {
        if (!isLastPage) {
            if (response) setEmployees((e) => [...e, ...response])
            if (response?.length === 0) {
                setIsLastPage(true)
            }
        }
    }, [isLastPage, response])

    const handleFilterChange = ({
        key,
        value,
    }: {
        key: string
        value: string[]
    }) => {
        setFilters((filters) => {
            const newFilters = filters.filter((f) => f.key !== key)
            for (const v of value) {
                newFilters.push({ key, value: v })
            }
            return newFilters
        })
    }

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

    const columns = [
        { key: 'name', label: 'ФИО' },
        { key: 'position', label: 'Должность' },
        { key: 'phone', label: 'Телефон' },
        { key: 'birthdate', label: 'Дата рождения' },
    ]
    const onRowClick = (row: IEmployee) => {
        navigate(`/employee/${row.id}`)
    }
    return (
        <main className={styles.main}>
            <Breadcrumbs links={breadcrumbs} />
            <section className={'container ' + styles.pagetitle__container}>
                <h1 className={styles.pagetitle__header}>Список сотрудников</h1>
                <div className={styles.pagetitle__controls}>
                    <Dropdown
                        label={'Должность'}
                        onDropdownChange={(selected) => {
                            handleFilterChange({
                                key: 'position',
                                value: selected,
                            })
                        }}
                        options={Object.entries(positionToString).map(
                            ([key, value]) => ({ value: key, label: value }),
                        )}
                    />
                    <Dropdown
                        label={'Пол'}
                        onDropdownChange={(selected) => {
                            handleFilterChange({
                                key: 'gender',
                                value: selected,
                            })
                        }}
                        options={Object.entries(genderToString).map(
                            ([key, value]) => ({ value: key, label: value }),
                        )}
                    />
                    <Dropdown
                        label={'Стек технологий'}
                        onDropdownChange={(selected) => {
                            handleFilterChange({
                                key: 'stack',
                                value: selected,
                            })
                        }}
                        options={Object.entries(technologyToString).map(
                            ([key, value]) => ({ value: key, label: value }),
                        )}
                    />
                </div>
                <div className={styles.pagetitle__search}>
                    <Searchbar
                        onChange={(e) => {
                            setFilters((f) => {
                                const filters = f.filter(
                                    (f) => f.key !== 'name',
                                )
                                if (e.target.value === '') return filters
                                filters.push({
                                    key: 'name',
                                    value: e.target.value,
                                })
                                return filters
                            })
                        }}
                    />
                </div>
            </section>
            <section className={'container ' + styles.filters__container}>
                <div className={styles.filters}>
                    Выбранные фильтры
                    <ul className={styles.filters__list}>
                        {filters
                            .filter((f) => f.key !== 'name')
                            .map((filter) => (
                                <Chip
                                    key={filter.value}
                                    label={filter.value}
                                    onClick={() => null}
                                />
                            ))}
                    </ul>
                    <div className={styles.filters__actions}>
                        <Button
                            label={'Найти'}
                            onClick={() => {
                                setIsLastPage(false)
                                setEmployees([])
                                setParams((p) => ({
                                    ...p,
                                    page: 1,
                                    filters: filters,
                                }))
                            }}
                        />
                    </div>
                </div>
            </section>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <Table
                    columns={columns}
                    rows={employees}
                    onRowClick={onRowClick}
                    lastRowRef={
                        lastEmployeeRef as unknown as RefObject<HTMLTableRowElement>
                    }
                />
            )}
        </main>
    )
}

export default Home
