import { TouchableOpacity, TouchableOpacityProps, View } from 'react-native'
import React, { memo } from 'react'
import { useDispatch } from 'react-redux'
import { setExpandedFilterIndex } from '@/store/filter/filtersSlice'
import { FilterInterface } from '.'
import { ThemedText } from '../ThemedText'

interface Props extends TouchableOpacityProps {
  item: FilterInterface,
  active: boolean
}


const OptionButton = ({ item, active, style }: Props) => {
  const dispatch = useDispatch()
  console.log(active, item.id);

  return (
    <View style={{ flex: 1, overflow: 'visible', zIndex: 1 }}>
      <TouchableOpacity
        style={[style]}
        onPress={() => dispatch(setExpandedFilterIndex(item.id))}>
        <ThemedText style={{ textAlign: 'center' }}>{item.name}</ThemedText>
      </TouchableOpacity>
      {active && <View style={{ position: 'absolute', backgroundColor: 'red', width: 100, height: 100, top: 20 }} />}
    </View>
  )
}


export default memo(OptionButton)
