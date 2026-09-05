import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import './index.css'
import App from './App.tsx'
import { store } from './app/store/store'
import { Toaster } from 'sonner'
import { CookiesProvider } from 'react-cookie'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CookiesProvider>
      <Provider store={store}>
        <App />
        <Toaster position="top-right" richColors />
      </Provider>
    </CookiesProvider>
  </StrictMode>,
)
