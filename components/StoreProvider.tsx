import { AppStore, store } from '@/store'
import React, { useRef } from 'react'
import { Provider } from 'react-redux'

const StoreProvider = ({ children }: { children: React.ReactNode }) => {
  const storeState = useRef<AppStore>(undefined)

  if (!storeState.current)
    storeState.current = store()

  return (
    <Provider store={storeState.current}>{children}</Provider>
  )
}

export default StoreProvider
