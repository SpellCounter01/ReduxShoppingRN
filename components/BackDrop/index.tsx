import { Dimensions, ScaledSize, TouchableOpacity } from "react-native";
import React, { memo, useEffect, useState } from 'react'

const BackDrop = ({ dispatch, active }: ({ dispatch: () => void, active: boolean })) => {
  const [sizes, setSizes] = useState<ScaledSize>(Dimensions.get('screen'))

  useEffect(() => {
    const subscription = Dimensions.addEventListener("change", (size) => setSizes(size.window));

    return () => subscription.remove();
  }, []);

  return <TouchableOpacity style={{
    backgroundColor: 'black',
    position: 'absolute',
    width: sizes?.width,
    height: sizes?.height,
    flex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: active ? 0.7 : 0
  }} onPress={dispatch}
    disabled={!active} />;
}

export default memo(BackDrop)
