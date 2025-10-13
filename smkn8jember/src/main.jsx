import { createRoot } from 'react-dom/client'
import './index.css'
import Router from './Router.jsx'
import AuthProvider from './providers/AuthProvider.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

console.log(`%c
  __  __ _                                   _  _   _____               _ 
 |  \\/  (_)        /\\                       | || | |  __ \\             (_)
 | \\  / |_  ___   /  \\  _   _  __ _ _ __ ___| || |_| |__) |__  _ __ ___ _ 
 | |\\/| | |/ _ \\ / /\\ \\| | | |/ _\` | '_ \` _ \\__   _|  ___/ _ \\| '__/ __| |
 | |  | | |  __// ____ \\ |_| | (_| | | | | | | | | | |  | (_) | |  \\__ \\ |
 |_|  |_|_|\\___/_/    \\_\\__, |\\__,_|_| |_| |_| |_| |_|   \\___/|_|  |___/_|
                         __/ |                                            
                        |___/                                             

MieAyam4Porsi - JHIC 2025
`, 
'color: #ffcc33; font-weight: bold; font-size: 12px; text-shadow: 1px 1px 3px #ff9900;');


createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <Router />
        </AuthProvider>
    </QueryClientProvider>
)
