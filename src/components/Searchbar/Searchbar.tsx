import styles from './Searchbar.module.css'

const Searchbar = () => {
    return (
        <input
            type="search"
            className={styles.searchbar}
            placeholder={'Поиск'}></input>
    )
}

export default Searchbar
