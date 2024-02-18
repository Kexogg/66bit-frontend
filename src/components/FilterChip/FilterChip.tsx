import { IFilter } from '../../types/IFilter.ts'

type ChipProps = {
    filter: IFilter
    filterRemoveCallback: (filter: IFilter) => void
}
import styles from './FilterChip.module.css'

const FilterChip = ({ filter, filterRemoveCallback }: ChipProps) => {
    return (
        <li>
            <label className={styles.chip}>
                <button
                    className={styles.chip__button}
                    onClick={() => filterRemoveCallback(filter)}
                    aria-label={'Удалить фильтр'}></button>
                {filter.label}
            </label>
        </li>
    )
}

export default FilterChip
