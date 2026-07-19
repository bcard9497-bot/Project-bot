import { Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import Home from './pages/Home'
import Chat from './pages/Chat'
import Pricing from './pages/Pricing'
import Dashboard from './pages/Dashboard'

function Layout({ children, footer = true }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      {footer && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><Home /></Layout>} />
      <Route path="/pricing" element={<Layout><Pricing /></Layout>} />
      <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
      {/* Chat has its own full-height layout without footer */}
      <Route path="/chat" element={<Layout footer={false}><Chat /></Layout>} />
      <Route path="*" element={<Layout><Home /></Layout>} />
    </Routes>
  )
}
