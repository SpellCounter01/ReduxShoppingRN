import { Dimensions, TouchableOpacity } from "react-native";
import React, { memo } from 'react'

const BackDrop = ({ dispatch, active }: ({ dispatch: () => void, active: boolean })) => <TouchableOpacity style={
  {
    backgroundColor: 'black',
    position: 'absolute',
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: active ? 0.7 : 0
  }
} onPress={dispatch}
  disabled={!active} />

export default memo(BackDrop)
