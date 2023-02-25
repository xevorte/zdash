import React from 'react'
import ReactDOM from 'react-dom/client'
import WebFont from 'webfontloader'

import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './bootstraps'

import App from './App'
import './styles/index.css'

WebFont.load({
  google: {
    families: ['Manrope:wght@0,300;0,400;0,500;0,600;0,700;0,800']
  }
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
