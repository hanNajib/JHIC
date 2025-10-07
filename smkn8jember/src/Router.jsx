import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from './page/History'
import HomePage from './page/HomePage'
import { Login } from './page/Login'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
