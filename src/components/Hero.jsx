import React, { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import '../styles/Hero.css'

const Hero = () => {
  const oilProducts = [
    {
      id: 'mustard',
      name: 'MUSTARD',
      fullName: 'Pure Mustard Oil',
      tagline: 'Swad Ka Powerful Blast!',
      description: 'Gold Mairani Kachi Ghani Pure Mustard Oil — traditional cold-pressed purity for every Indian kitchen.',
      image: '/images/mustard_oil_bottle.png',
      bgGradient: 'radial-gradient(ellipse at 50% 40%, rgba(211, 47, 47, 0.10) 0%, transparent 60%)',
      accentColor: '#D32F2F',
      glowColor: 'rgba(211, 47, 47, 0.3)',
      nameBgColor: '#D32F2F',
    },
    {
      id: 'soyabean',
      name: 'SOYABEAN',
      fullName: 'Refined Soya Oil',
      tagline: 'Rich in Taste & Purity',
      description: 'Gold Mairani Refined Soya Bean Oil — light, healthy & rich in essential nutrients for wholesome cooking.',
      image: '/images/soyabean_oil_bottle.png',
      bgGradient: 'radial-gradient(ellipse at 50% 40%, rgba(27, 94, 32, 0.10) 0%, transparent 60%)',
      accentColor: '#1B5E20',
      glowColor: 'rgba(76, 175, 80, 0.3)',
      nameBgColor: '#4CAF50',
    },
    {
      id: 'cottonseed',
      name: 'COTTONSEED',
      fullName: 'Refined Cottonseed Oil',
      tagline: 'Pure & Light Cooking',
      description: 'Gold Mairani Refined Cottonseed Oil — naturally light, pure and perfect for crispy, healthy frying.',
      image: '/images/cottonseed_oil_bottle.png',
      bgGradient: 'radial-gradient(ellipse at 50% 40%, rgba(230, 81, 0, 0.10) 0%, transparent 60%)',
      accentColor: '#E65100',
      glowColor: 'rgba(255, 152, 0, 0.3)',
      nameBgColor: '#FF9800',
    }
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex(prev => (prev + 1) % oilProducts.length)
  }, [oilProducts.length])

  const handlePrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex(prev => (prev - 1 + oilProducts.length) % oilProducts.length)
  }, [oilProducts.length])

  const handleSelect = useCallback((index) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }, [currentIndex])

  const current = oilProducts[currentIndex]

  // Bottle slide animation
  const bottleVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 200 : -200,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      }
    },
    exit: (dir) => ({
      x: dir > 0 ? -200 : 200,
      opacity: 0,
      scale: 0.85,
      transition: {
        duration: 0.4,
        ease: 'easeIn'
      }
    })
  }

  // Background text animation — subtle watermark
  const bgTextVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 100 : -100,
      y: "-50%",
      opacity: 0,
    }),
    center: {
      x: 0,
      y: "-50%",
      opacity: 0.06,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }
    },
    exit: (dir) => ({
      x: dir > 0 ? -100 : 100,
      y: "-50%",
      opacity: 0,
      transition: { duration: 0.35 }
    })
  }

  // Info text animation
  const infoVariants = {
    enter: { opacity: 0, y: 20 },
    center: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }
    },
    exit: {
      opacity: 0,
      y: -15,
      transition: { duration: 0.25 }
    }
  }

  return (
    <section className="hero" id="hero">
      {/* Subtle Background Tint */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`bg-${currentIndex}`}
          className="hero-bg-gradient"
          style={{ background: current.bgGradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
        />
      </AnimatePresence>

      {/* Subtle ground reflection */}
      <div className="hero-ambient-glow" style={{ background: current.glowColor }} />

      {/* ===== CENTERED STAGE: Name behind → Bottle in front ===== */}
      <div className="hero-center-stage">

        {/* BIG NAME TEXT - watermark behind bottle */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`bgtext-${currentIndex}`}
            className="hero-bg-name"
            custom={direction}
            variants={bgTextVariants}
            initial="enter"
            animate="center"
            exit="exit"
            style={{ color: current.nameBgColor }}
          >
            {current.name}
          </motion.div>
        </AnimatePresence>

        {/* BOTTLE - centered, in front of name */}
        <div className="bottle-perspective-wrapper">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={`bottle-${currentIndex}`}
              className="bottle-3d-container"
              custom={direction}
              variants={bottleVariants}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <img
                src={current.image}
                alt={current.fullName}
                className="bottle-hero-image"
                draggable={false}
              />

              {/* Bottle ground shadow */}
              <div
                className="bottle-glow"
                style={{
                  background: `radial-gradient(ellipse, ${current.glowColor} 0%, transparent 70%)`
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="hero-controls">
        <motion.button
          className="hero-nav-btn"
          onClick={handlePrev}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Previous product"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </motion.button>

        <div className="hero-indicators">
          {oilProducts.map((product, i) => (
            <motion.button
              key={i}
              className={`hero-dot ${i === currentIndex ? 'active' : ''}`}
              onClick={() => handleSelect(i)}
              animate={{
                width: i === currentIndex ? 32 : 10,
                background: i === currentIndex
                  ? product.accentColor
                  : 'rgba(255,255,255,0.25)'
              }}
              whileHover={{ scale: 1.15 }}
              transition={{ duration: 0.3 }}
              aria-label={`Select ${product.fullName}`}
            />
          ))}
        </div>

        <motion.button
          className="hero-nav-btn"
          onClick={handleNext}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Next product"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </motion.button>
      </div>

      {/* ===== PRODUCT INFO ===== */}
      <div className="hero-info-bar">
        <AnimatePresence mode="wait">
          <motion.div
            key={`info-${currentIndex}`}
            className="hero-info-content"
            variants={infoVariants}
            initial="enter"
            animate="center"
            exit="exit"
          >
            <span
              className="hero-badge"
              style={{ borderColor: current.accentColor, color: current.accentColor }}
            >
              Gold Mairani
            </span>

            <h1 className="hero-main-title">{current.fullName}</h1>

            <p className="hero-tagline" style={{ color: current.accentColor }}>
              {current.tagline}
            </p>

            <p className="hero-desc">{current.description}</p>

            <div className="hero-cta-group">
              <motion.a
                href="#products"
                className="btn-gold"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Explore Products
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Hero
