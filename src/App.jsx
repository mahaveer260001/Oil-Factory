import React from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProductCarousels from './components/ProductCarousels'
import Features from './components/Features'
import About from './components/About'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <ProductCarousels />
      <Features />
      <About />
      <Footer />
    </div>
  )
}

export default App
