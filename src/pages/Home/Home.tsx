import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'
import Dropdown from '../../components/Dropdown/Dropdown.tsx'
import styles from './Home.module.css'
import Searchbar from '../../components/Searchbar/Searchbar.tsx'
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
        </main>
    )
}

export default Home
