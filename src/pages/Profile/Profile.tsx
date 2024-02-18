import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.tsx'
import { useGetEmployeeById } from '../../api/api.ts'
import { useParams } from 'react-router-dom'
import styles from './Profile.module.css'

const Profile = () => {
    const { id } = useParams()
    const [response, error, loading] = useGetEmployeeById({
        id: Number.parseInt(id || '0'),
    })
    const breadcrumbs = [
        {
            name: 'Список сотрудников',
            link: '/',
        },
        {
            name: response?.name || 'Профиль сотрудника',
            link: '/employee/' + id,
        },
    ]
    if (loading) return <div>loading...</div>
    if (error) return <div>error</div>

    return (
        <main className={styles.profile__container}>
            <Breadcrumbs links={breadcrumbs} />
            <section className={'container'}>
                <div className={styles.profile__header}>
                    <img
                        className={styles.profile__image}
                        src={response?.photo}
                        alt={response?.name}
                    />
                    <article>
                        <h1>{response?.name}</h1>
                        <h2>{response?.position}</h2>
                        {response?.stack && (
                            <ul className={styles.profile__skills}>
                                {response?.stack.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        )}
                    </article>
                </div>

                <hr className={styles.profile__divider} />
                <h2 className={styles.profile__details__header}>
                    Основная информация
                </h2>
                <table className={styles.profile__table}>
                    <tbody>
                        <tr>
                            <td>Дата рождения</td>
                            <td>{response?.birthdate}</td>
                        </tr>
                        <tr>
                            <td>Телефон</td>
                            <td>
                                <a href={response?.phone}>{response?.phone}</a>
                            </td>
                        </tr>
                        <tr>
                            <td>Дата устройства</td>
                            <td>{response?.dateOfEmployment}</td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    )
}

export default Profile
