import { createRoot } from 'react-dom/client'
import Router from './apps/router'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <Router />
  </BrowserRouter>,
)
