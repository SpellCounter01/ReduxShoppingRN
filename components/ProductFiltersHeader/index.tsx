import React, { memo } from 'react'
import { ThemedView } from '../ThemedView'
import { useTheme } from '@react-navigation/native'
import OptionButton from './OptionButton'

const ProductFiltersHeader = () => {
  const theme = useTheme();

  return (
    <ThemedView style={{ flex: 1, marginHorizontal: -24, backgroundColor: theme.colors.background, padding: 24, justifyContent: "space-between", flexDirection: "row" }}>
      <OptionButton text={"Category"} />
      <OptionButton text={"Category"} />
      <OptionButton text={"Category"} />
      <OptionButton text={"Category"} />
      <OptionButton text={"Category"} />
      <OptionButton text={"Category"} />
    </ThemedView>
  )
}

export default memo(ProductFiltersHeader)
