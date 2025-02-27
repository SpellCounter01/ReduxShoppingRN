import React, { memo, useEffect } from 'react'
import OptionButton from './OptionButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import BackDrop from '../BackDrop'
import { fetchCategories, setExpandedFilterIndex } from '@/store/filter/filtersSlice'
import { ThemedView } from '../ThemedView'

type FiterName = 'Category' | 'Price' | 'Discount'

export interface FilterInterface {
  id: number
  name: FiterName
}

const Filters: Array<FilterInterface> = [
  {
    id: 1,
    name: 'Category'
  }, {
    id: 2,
    name: 'Discount'
  },
  {
    id: 3,
    name: 'Price'
  }
]

const ProductFiltersHeader = () => {
  const FilterState = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <ThemedView darkBackground style={{ marginHorizontal: -24, flexDirection: "row", padding: 24 }}>
      {Filters.map((item) => <OptionButton key={item.id} item={item} active={item.id === FilterState.expandedFilterIndex} />)}
      <BackDrop active={!!FilterState?.expandedFilterIndex} dispatch={() => dispatch(setExpandedFilterIndex(undefined))} />
    </ThemedView >
  )
}

export default memo(ProductFiltersHeader)
