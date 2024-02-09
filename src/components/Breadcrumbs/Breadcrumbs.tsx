import styles from './Breadcrumbs.module.css'

type BreadcrumbsProps = {
    links: {
        name: string
        link: string
    }[]
}
const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
    return (
        <nav aria-label="breadcrumb" className={styles.breadcrumbs__container}>
            <ul className={styles.breadcrumbs__list}>
                {links.map((link, index) => (
                    <li key={index} className={styles.breadcrumbs__item}>
                        <a
                            href={link.link.toString()}
                            className={styles.breadcrumbs__link}>
                            {link.name}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Breadcrumbs
