import styles from './Dropdown.module.css'
import Checkbox from '../Checkbox/Checkbox.tsx'
import { useEffect, useState } from 'react'

type DropdownProps = {
    options: {
        value: string
        label: string
    }[]
    label: string
}

const Dropdown = ({ options, label }: DropdownProps) => {
    const [open, setOpen] = useState(false)
    useEffect(() => {
        if (open) {
            document.addEventListener('click', () => setOpen(false))
        }
        return () => {
            document.removeEventListener('click', () => setOpen(false))
        }
    }, [open])
    return (
        <label
            className={styles.dropdown__label}
            onClick={(e) => e.stopPropagation()}>
            {label}
            <input
                type={'checkbox'}
                className={styles.dropdown__checkbox}
                onChange={(e) => setOpen(e.target.checked)}
                checked={open}
            />
            <ul className={styles.dropdown__options}>
                {options.map((option) => (
                    <li key={option.value}>
                        <Checkbox label={option.label} />
                    </li>
                ))}
            </ul>
        </label>
    )
}

export default Dropdown
