import { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './Checkbox.module.css'

type CheckboxProps = DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
> & {
    label: string
}

const Checkbox = ({ label, ...props }: CheckboxProps) => {
    return (
        <label className={styles.checkbox__label}>
            {label}
            <input
                className={styles.checkbox__input}
                type={'checkbox'}
                {...props}
            />
        </label>
    )
}

export default Checkbox
