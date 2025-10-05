import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './page/Index'
import History from './page/History'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
