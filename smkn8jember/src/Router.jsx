import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from './page/History'
import HomePage from './page/HomePage'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
