import styles from './Searchbar.module.css'
import { DetailedHTMLProps, InputHTMLAttributes } from 'react'

type SearchbarProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
>
const Searchbar = ({ ...props }: SearchbarProps) => {
    return (
        <input
            {...props}
            type="search"
            className={styles.searchbar}
            placeholder={'Поиск'}
        />
    )
}

export default Searchbar
