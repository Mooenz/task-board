import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Board from '@/pages/Board'
import ToastContainer from '@/components/Toast'
import { Layout } from '@/layout/Layout'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id" element={<Board />} />
      </Routes>
      <ToastContainer />
    </Layout>
  )
}

export default App
