import styles from './SearchBox.module.css'
import Dropdown from '../Dropdown/Dropdown.tsx'
import { Gender, Position, Technology } from '../../types/types.ts'
import Searchbar from '../Searchbar/Searchbar.tsx'
import { IFilter } from '../../types/IFilter.ts'

type SearchBoxProps = {
    filters: IFilter[]
    handleFilterChange: (filters: IFilter) => void
    setQuery: (query: string) => void
    query: string
}

const SearchBox = ({
    filters,
    handleFilterChange,
    setQuery,
    query,
}: SearchBoxProps) => {
    const dropdowns = [
        {
            label: 'Должность',
            key: 'position',
            optionsEnum: Position,
        },
        {
            label: 'Пол',
            key: 'Gender',
            optionsEnum: Gender,
        },
        {
            label: 'Стек технологий',
            key: 'Stack',
            optionsEnum: Technology,
        },
    ]

    return (
        <section className={'container'}>
            <div className={styles.pagetitle__container}>
                <h1 className={styles.pagetitle__header}>Список сотрудников</h1>
                <div className={styles.pagetitle__controls}>
                    {dropdowns.map((dropdown) => (
                        <Dropdown
                            key={dropdown.key}
                            label={dropdown.label}
                            selected={
                                filters
                                    .filter(
                                        (f) => f.value in dropdown.optionsEnum,
                                    )
                                    .map((f) => f.value) || []
                            }
                            selectCallback={(changedFilter) => {
                                handleFilterChange(changedFilter)
                            }}
                            options={Object.entries(dropdown.optionsEnum).map(
                                ([key, value]) => ({
                                    filterKey: dropdown.key,
                                    label: value,
                                    value: key,
                                }),
                            )}
                        />
                    ))}
                </div>
                <div className={styles.pagetitle__search}>
                    <Searchbar
                        defaultValue={query}
                        onChange={(e) => {
                            setQuery(e.target.value)
                        }}
                    />
                </div>
            </div>
        </section>
    )
}

export default SearchBox
