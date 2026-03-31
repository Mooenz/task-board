import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '@/pages/Home'
import Board from '@/pages/Board'
import { Layout } from '@/layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/board" replace />} />
        <Route path="/board" element={<Home />} />
        <Route path="/board/:id" element={<Board />} />
      </Routes>
    </Layout>
  )
}

export default App
