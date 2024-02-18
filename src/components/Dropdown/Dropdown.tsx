import styles from './Dropdown.module.css'
import Checkbox from '../Checkbox/Checkbox.tsx'
import { useEffect, useState } from 'react'
import { IFilter } from '../../types/IFilter.ts'

type DropdownProps = {
    options: IFilter[]
    label: string
    selected: string[]
    selectCallback: (selected: IFilter) => void
}

const Dropdown = ({
    options,
    label,
    selected,
    selectCallback,
}: DropdownProps) => {
    const [open, setOpen] = useState(false)
    const [dropdownId] = useState(Date.now().toString())
    useEffect(() => {
        if (open) document.addEventListener('click', () => setOpen(false))
        return () => document.removeEventListener('click', () => setOpen(false))
    }, [open])
    return (
        <label
            className={styles.dropdown__label}
            data-id={dropdownId}
            onClick={(e) => {
                // allow only one dropdown to be open at a time
                if (
                    !(e.target instanceof HTMLElement) ||
                    e.target.dataset.id !== dropdownId ||
                    open
                )
                    e.stopPropagation()
                // prevent clicking on ul from modifying input
                if (e.target instanceof HTMLUListElement) {
                    e.preventDefault()
                }
            }}>
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
                        <Checkbox
                            checked={selected.some(
                                (selectedOption) =>
                                    selectedOption === option.value,
                            )}
                            label={option.label}
                            value={option.value}
                            onChange={() => selectCallback(option)}
                        />
                    </li>
                ))}
            </ul>
        </label>
    )
}

export default Dropdown
