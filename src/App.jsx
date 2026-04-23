import React, { useState, useEffect } from 'react'
import Hero from './components/Hero'
import Features from './components/Features'
import Story from './components/Story'
import Testimonials from './components/Testimonials'
import CTA from './components/CTA'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [scrollY, setScrollY] = useState(0)

  // Track scroll position for parallax effects
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="App">
      {/* Hero section with parallax scroll tracking */}
      <Hero scrollY={scrollY} />

      {/* Features section - 4 feature cards with staggered animations */}
      <Features />

      {/* Brand story section - split layout with scroll animations */}
      <Story />

      {/* Testimonials - carousel slider with smooth transitions */}
      <Testimonials />

      {/* Call-to-action section with gradient background animation */}
      <CTA />

      {/* Footer with animated links and social icons */}
      <Footer />
    </div>
  )
}

export default App
