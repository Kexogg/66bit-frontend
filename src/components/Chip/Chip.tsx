type ChipProps = {
    label: string
    onClick: () => void
}
import styles from './Chip.module.css'

const Chip = ({ label, onClick }: ChipProps) => {
    return (
        <li>
            <label className={styles.chip}>
                <button
                    className={styles.chip__button}
                    onClick={onClick}
                    aria-label={'Удалить фильтр'}></button>
                {label}
            </label>
        </li>
    )
}

export default Chip
