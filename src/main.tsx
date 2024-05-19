import React from 'react'
import '@fontsource-variable/inter'
import './styles/index.scss'

import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'
import { Provider } from 'react-redux'
import { store } from '@/store/store'

createRoot(document.getElementById('root')!).render(
   <Provider store={store}>
      <React.StrictMode>
         <App />
      </React.StrictMode>
   </Provider>
)
