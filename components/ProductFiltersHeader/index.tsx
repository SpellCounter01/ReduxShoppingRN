import React, { memo, useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import OptionButton from './OptionButton'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store'
import BackDrop from '../BackDrop'
import { View } from 'react-native'
import { fetchCategories, setExpandedFilterIndex } from '@/store/filter/filtersSlice'

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
  const theme = useTheme();
  const FilterState = useSelector((state: RootState) => state.filter)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])

  return (
    <View style={{ marginHorizontal: -24, backgroundColor: theme.colors.background, flexDirection: "row", padding: 24 }}>
      {Filters.map((item) => <OptionButton key={item.id} item={item} active={item.id === FilterState.expandedFilterIndex} />)}
      <BackDrop active={!!FilterState?.expandedFilterIndex} dispatch={() => dispatch(setExpandedFilterIndex(undefined))} />
    </View>
  )
}

export default memo(ProductFiltersHeader)
