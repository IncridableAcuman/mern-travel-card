import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {BrowserRouter} from'react-router-dom'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient=new QueryClient()

createRoot(document.getElementById('root')!).render(

    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
            <App />
            <Toaster position='top-center'/>
        </BrowserRouter> 
    </QueryClientProvider>

)
