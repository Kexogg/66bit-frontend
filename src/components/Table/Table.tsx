import styles from './Table.module.css'
import { RefObject } from 'react'

type TableProps<T> = {
    columns: { key: string; label: string }[]
    rows: T[]
    onRowClick?: (row: T) => void
    lastRowRef?: RefObject<HTMLTableRowElement>
}

const Table = <T = unknown,>({
    columns,
    rows,
    onRowClick,
    lastRowRef,
}: TableProps<T>) => {
    return (
        <section className={'container ' + styles.table__container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        {columns.map((column, index) => {
                            return <th key={index}>{column.label}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        return (
                            <tr
                                ref={
                                    index === rows.length - 1
                                        ? lastRowRef
                                        : undefined
                                }
                                key={index}
                                onClick={() => onRowClick && onRowClick(row)}>
                                {columns.map((column, index) => {
                                    return (
                                        <td key={index}>
                                            {String(row[column.key as keyof T])}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </section>
    )
}

export default Table
