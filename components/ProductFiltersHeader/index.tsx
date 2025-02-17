import React, { memo } from 'react'
import { useTheme } from '@react-navigation/native'
import OptionButton from './OptionButton'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '@/store'
import BackDrop from '../BackDrop'
import { setExpandedFilterIndex } from '@/store/filter/filtersSlice'
import { View } from 'react-native'

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
  const FilterState = useSelector((state: RootState) => state)
  const dispatch = useDispatch()

  console.log(
    'test'
  );


  return (
    <View style={{ marginHorizontal: -24, backgroundColor: theme.colors.background, flexDirection: "row", padding: 24 }}>
      {Filters.map((item) => <OptionButton key={item.id} item={item} active={item.id === FilterState.filter.expandedFilterIndex} />)}
      <BackDrop active={!!FilterState.filter?.expandedFilterIndex} dispatch={() => dispatch(setExpandedFilterIndex(undefined))} />
    </View>
  )
}

export default memo(ProductFiltersHeader)
