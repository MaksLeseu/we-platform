import React from 'react'
import '@fontsource-variable/inter'
import './styles/index.scss'

import { createRoot } from 'react-dom/client'

import App from '@/App.tsx'

createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>
)
