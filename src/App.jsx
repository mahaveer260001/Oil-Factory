import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCarousels from './components/ProductCarousels'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import ProductDetail from './components/ProductDetail'
import './App.css'

function App() {
  return (
    <Router>
      <Navbar />
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
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
