import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.scss'
import { QueryClient } from '@tanstack/query-core'
import {  QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter } from 'react-router-dom'
const client = new QueryClient()
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
  <QueryClientProvider  client={client} >
  <App />
 <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
 </BrowserRouter>
</React.StrictMode>,
)
