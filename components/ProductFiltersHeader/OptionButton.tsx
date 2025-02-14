import { TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ThemedText } from '../ThemedText'

const OptionButton = ({ text }: { text: string }) => {
  const [overflow, setOverflow] = useState<"hidden" | "visible" | "scroll" | undefined>('hidden')

  return (
    <TouchableOpacity style={{ flex: 1, alignItems: 'center', overflow: overflow }}
      onPress={() => setOverflow(overflow == 'hidden' ? 'visible' : 'hidden')}>
      <ThemedText>{text}</ThemedText>
      <View style={{ position: 'absolute', backgroundColor: 'red', width: 100, height: 100, top: 20 }}>
      </View >
    </TouchableOpacity>
  )
}

export default OptionButton
