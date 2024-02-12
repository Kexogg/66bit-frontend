import styles from './Dropdown.module.css'
import Checkbox from '../Checkbox/Checkbox.tsx'
import { useEffect, useState } from 'react'

type DropdownProps = {
    options: {
        value: string
        label: string
    }[]
    label: string
    onDropdownChange?: (value: string[]) => void
}

const Dropdown = ({ options, label, onDropdownChange }: DropdownProps) => {
    const [open, setOpen] = useState(false)
    //individual id of each dropdown
    const [id] = useState(Date.now().toString())
    const [selected, setSelected] = useState<string[]>([])
    useEffect(() => {
        if (onDropdownChange) onDropdownChange(selected)
    }, [selected])
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
            data-id={id}
            onClick={(e) => {
                // allow only one dropdown to be open at a time
                if (
                    !(e.target instanceof HTMLElement) ||
                    e.target.dataset.id !== id ||
                    open
                )
                    e.stopPropagation()
            }}>
            {label}
            <input
                type={'checkbox'}
                className={styles.dropdown__checkbox}
                onChange={(e) => setOpen(e.target.checked)}
                checked={open}
            />
            <ul
                className={styles.dropdown__options}
                onClick={(e) => e.stopPropagation()}>
                {options.map((option) => (
                    <li key={option.value}>
                        <Checkbox
                            label={option.label}
                            onChange={() =>
                                setSelected((s) => {
                                    if (s.includes(option.value)) {
                                        return s.filter(
                                            (i) => i !== option.value,
                                        )
                                    } else {
                                        return [...s, option.value]
                                    }
                                })
                            }
                        />
                    </li>
                ))}
            </ul>
        </label>
    )
}

export default Dropdown
