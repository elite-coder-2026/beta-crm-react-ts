import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import NotificationProvider from './components/notifications/notification-provider'
import ToastProvider from './components/toasts/toast-provider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </NotificationProvider>
  </StrictMode>,
)
