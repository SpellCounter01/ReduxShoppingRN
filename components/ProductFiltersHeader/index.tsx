import React, { memo } from 'react'
import { ThemedView } from '../ThemedView'
import { useTheme } from '@react-navigation/native'
import OptionButton from './OptionButton'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

type FiterName = 'Category' | 'Price' | 'Discount'

export interface FilterInterface {
  id: number
  name: FiterName
}

const Filters: Array<filters> = [
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

  console.log(
    'test'
  );


  return (
    <ThemedView style={{ flex: 1, marginHorizontal: -24, backgroundColor: theme.colors.background, padding: 24, justifyContent: "space-between", flexDirection: "row" }}>
      {Filters.map((item) => <OptionButton key={item.id} item={item} active={item.id === FilterState.filter.expandedFilterIndex} />)}
    </ThemedView >
  )
}

export default memo(ProductFiltersHeader)
