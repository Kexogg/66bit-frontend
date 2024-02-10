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

const Home = () => {
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
    const filters = [
        {
            label: 'Должность',
            value: 'Разработчик',
        },
        {
            label: 'Пол',
            value: 'Мужской',
        },
        {
            label: 'Стек технологий',
            value: 'React',
        },
    ]

    const [response, error, loading] = useGetEmployees({ page: 1, count: 10 })
    const columns = [
        { key: 'name', label: 'ФИО' },
        { key: 'position', label: 'Должность' },
        { key: 'phone', label: 'Телефон' },
        { key: 'birthdate', label: 'Дата рождения' },
    ]
    const navigate = useNavigate()
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
                response && (
                    <Table
                        columns={columns}
                        rows={response}
                        onRowClick={onRowClick}
                    />
                )
            )}
        </main>
    )
}

export default Home
