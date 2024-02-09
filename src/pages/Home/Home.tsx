import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'

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
        <main>
            <Breadcrumbs links={links} />
        </main>
    )
}

export default Home
