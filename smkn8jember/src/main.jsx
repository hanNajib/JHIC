import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <Router />
        </AuthProvider>
    </QueryClientProvider>
)
