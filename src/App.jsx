import React from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCarousels from './components/ProductCarousels'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import ClaimPage from './components/ClaimPage'
import './App.css'

function AppInner() {
  const location = useLocation()
  const isClaim = location.pathname.startsWith('/r/')

  return (
    <>
      {!isClaim && <Navbar />}
      <Routes>
        <Route path="/" element={
          <>
            <Hero />
            <ProductCarousels />
            <Features />
            <About />
          </>
        } />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/r/:code" element={<ClaimPage />} />
      </Routes>
      {!isClaim && <Footer />}
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
