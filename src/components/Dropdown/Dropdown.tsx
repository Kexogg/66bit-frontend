import styles from './Dropdown.module.css'
import Checkbox from '../Checkbox/Checkbox.tsx'

type DropdownProps = {
    options: {
        value: string
        label: string
    }[]
    label: string
}

const Dropdown = ({ options, label }: DropdownProps) => {
    return (
        <label className={styles.dropdown__label}>
            {label}
            <input type={'checkbox'} className={styles.dropdown__checkbox} />
            <ul className={styles.dropdown__options}>
                {options.map((option) => (
                    /*<li key={option.value}>{option.label}</li>*/
                    <li key={option.value}>
                        <Checkbox label={option.label} />
                    </li>
                ))}
            </ul>
        </label>
    )
}

export default Dropdown
