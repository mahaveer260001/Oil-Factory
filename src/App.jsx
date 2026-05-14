import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCarousels from './components/ProductCarousels'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import ClaimPage from './components/ClaimPage'
import ScannerPage from './components/ScannerPage'
import './App.css'

function AppInner() {
  const location = useLocation()
  const isClaim = location.pathname.startsWith('/r/')
  const isScanner = location.pathname === '/scan'
  const [scannerOpen, setScannerOpen] = useState(false)

  const hideChrome = isClaim || isScanner

  return (
    <>
      {!hideChrome && <Navbar onScanClick={() => setScannerOpen(true)} />}

      <Routes>
        <Route path="/" element={
          <>
            <Hero onScanClick={() => setScannerOpen(true)} />
            <ProductCarousels />
            <Features />
            <About />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/r/:code" element={<ClaimPage />} />
        <Route path="/scan" element={<ScannerPage />} />
      </Routes>

      {!hideChrome && <Footer />}

      {/* Scanner modal overlay */}
      {scannerOpen && (
        <div className="scanner-modal-backdrop" onClick={(e) => {
          if (e.target === e.currentTarget) setScannerOpen(false)
        }}>
          <div className="scanner-modal-inner">
            <ScannerPage onClose={() => setScannerOpen(false)} />
          </div>
        </div>
      )}
    </>
  )
}

function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  )
}

export default App
