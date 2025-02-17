import { TouchableOpacity, View } from 'react-native'
import React, { memo } from 'react'
import { ThemedText } from '../ThemedText'
import { useDispatch } from 'react-redux'
import { setExpandedFilterIndex } from '@/store/filter/filtersSlice'
import { FilterInterface } from '.'

const OptionButton = ({ item, active }: { item: FilterInterface, active: boolean }) => {
  const dispatch = useDispatch()

  return (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', overflow: active ? 'visible' : 'hidden' }}
      onPress={() => dispatch(setExpandedFilterIndex(item.id))}>
      <ThemedText>{item.name}</ThemedText>
      <View style={{ position: 'absolute', backgroundColor: 'red', width: 100, height: 100, top: 20 }}>
      </View>
    </TouchableOpacity>
  )
}

export default memo(OptionButton)
