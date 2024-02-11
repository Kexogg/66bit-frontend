import styles from './Breadcrumbs.module.css'
import { Link } from 'react-router-dom'

type BreadcrumbsProps = {
    links: {
        name: string
        link: string
    }[]
}
const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
    return (
        <nav
            aria-label="breadcrumb"
            className={'container ' + styles.breadcrumbs__container}>
            <ul className={styles.breadcrumbs__list}>
                {links.map((link, index) => (
                    <li key={index} className={styles.breadcrumbs__item}>
                        <Link
                            to={link.link.toString()}
                            className={styles.breadcrumbs__link}>
                            {link.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
