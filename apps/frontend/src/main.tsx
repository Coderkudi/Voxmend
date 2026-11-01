import { createRoot } from 'react-dom/client'
import './index.css'
import { AuthProvider } from '@/context/AuthContext.tsx'
import AppRoutes from './routes/AppRoutes.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
  <BrowserRouter>
    <AppRoutes/>
    </BrowserRouter>

    </AuthProvider>
)
