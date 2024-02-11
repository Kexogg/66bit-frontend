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

type filter = {
    label: string
    value: string
    key: string
}

const Home = () => {
    const [params, setParams] = useState({
        page: 1,
        count: 10,
    })
    const navigate = useNavigate()

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

    const links = [
        {
            name: 'Главная',
            link: '/',
        },
        {
            name: 'Список сотрудников',
            link: '/',
        },
    ]
    const [filters, setFilters] = useState<filter[]>([])

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
            <Breadcrumbs links={links} />
            <section className={'container ' + styles.pagetitle__container}>
                <h1 className={styles.pagetitle__header}>Список сотрудников</h1>
                <div className={styles.pagetitle__controls}>
                    <Dropdown
                        label={'Должность'}
                        options={[
                            { value: '1', label: 'Разработчик' },
                            { value: '2', label: 'Дизайнер' },
                            { value: '3', label: 'Менеджер' },
                        ]}
                    />
                    <Dropdown
                        label={'Пол'}
                        options={[
                            { value: '1', label: 'По возрастанию' },
                            { value: '2', label: 'По убыванию' },
                        ]}
                    />
                    <Dropdown options={[]} label={'Стек технологий'} />
                </div>
                <div className={styles.pagetitle__search}>
                    <Searchbar />
                </div>
            </section>
            <section className={'container ' + styles.filters__container}>
                <div className={styles.filters}>
                    Выбранные фильтры
                    <ul className={styles.filters__list}>
                        {filters.map((filter) => (
                            <Chip
                                key={filter.label}
                                label={filter.label}
                                onClick={() => null}
                            />
                        ))}
                    </ul>
                    <div className={styles.filters__actions}>
                        <Button label={'Найти'} />
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
