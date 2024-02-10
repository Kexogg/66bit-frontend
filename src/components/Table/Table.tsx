import styles from './Table.module.css'

type TableProps<T> = {
    columns: { key: string; label: string }[]
    rows: T[]
    onRowClick?: (row: T) => void
}

const Table = <T = unknown,>({ columns, rows, onRowClick }: TableProps<T>) => {
    return (
        <section className={'container'}>
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
