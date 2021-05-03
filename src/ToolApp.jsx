import React from 'react';
import { AppRouter } from './routers/AppRouter';
import { Provider } from 'react-redux'
import generateStore from './redux/store'

export const ToolApp = () => {

  const store = generateStore()

  return (
    <Provider store={store}>
      <div>
        <AppRouter/>
      </div>
    </Provider>
  )
}

