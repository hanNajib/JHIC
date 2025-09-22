import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './page/Index'
import Dashboard from './component/pages/Dashboard'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
