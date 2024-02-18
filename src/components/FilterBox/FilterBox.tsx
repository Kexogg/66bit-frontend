import FilterChip from '../FilterChip/FilterChip.tsx'
import Button from '../Button/Button'
import styles from './FilterBox.module.css'
import { IFilter } from '../../types/IFilter.ts'

type FilterBoxProps = {
    filters: IFilter[]
    filterRemoveCallback: (filter: IFilter) => void
    findCallback: () => void
}
const FilterBox = ({
    filters,
    filterRemoveCallback,
    findCallback,
}: FilterBoxProps) => {
    return (
        <section className={'container ' + styles.filters__container}>
            <div className={styles.filters}>
                Выбранные фильтры
                <ul className={styles.filters__list}>
                    {filters.map((filter) => (
                        <FilterChip
                            key={filter.value}
                            filter={filter}
                            filterRemoveCallback={filterRemoveCallback}
                        />
                    ))}
                </ul>
                <div className={styles.filters__actions}>
                    <Button label={'Найти'} onClick={findCallback} />
                </div>
            </div>
        </section>
    )
}

export default FilterBox
