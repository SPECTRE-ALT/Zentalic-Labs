import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ZynxDetail from './pages/ZynxDetail'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zynx" element={<ZynxDetail />} />
    </Routes>
  )
}

export default App
