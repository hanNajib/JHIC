import { BrowserRouter, Routes, Route } from 'react-router-dom'
import History from './page/History'
import HomePage from './page/HomePage'
import HeadMaster from './page/HeadMaster'
import Gallery from './page/Gallery'
import Announcement from './page/Announcement'

function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/history" element={<History />} />
        <Route path="/headmaster" element={<HeadMaster />} />
        <Route path="/Gallery" element={<Gallery />} />
        <Route path="/Announcement" element={<Announcement />} />

      </Routes>
    </BrowserRouter>
  )
}

export default Router
