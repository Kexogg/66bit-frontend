import styles from './Header.module.css'
import logo from '../../assets/logo.svg'
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch.tsx'
const Header = () => {
    return (
        <header id={styles.header}>
            <img src={logo} className={styles.logo} alt="66Бит" />
            <nav>
                <a href="tel:+73432908476">+7 343 290 84 76</a>
                <a href="mailto:info@66bit.ru">info@66bit.ru</a>
                <ThemeSwitch />
            </nav>
        </header>
    )
}

export default Header
