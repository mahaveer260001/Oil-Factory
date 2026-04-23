import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/CTA.css'

const CTA = () => {
  const { ref, inView } = useInView({
    threshold: 0.4,
    triggerOnce: true
  })

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
    }
  }

  // Text animation
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2 + i * 0.15,
        duration: 0.6
      }
    })
  }

  // Button animation
  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.5, duration: 0.6 }
    },
    hover: { 
      scale: 1.08,
      boxShadow: '0 20px 50px rgba(244, 208, 63, 0.4)'
    }
  }

  return (
    <section className="cta" ref={ref}>
      {/* Animated background elements */}
      <motion.div 
        className="cta-bg-gradient"
        animate={{ 
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
        }}
        transition={{ 
          duration: 12, 
          repeat: Infinity,
          ease: 'linear'
        }}
      />

      <motion.div 
        className="cta-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Main heading */}
        <motion.h2 
          className="cta-title"
          variants={textVariants}
          custom={0}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Ready to Transform Your Kitchen?
        </motion.h2>

        {/* Subtext */}
        <motion.p 
          className="cta-text"
          variants={textVariants}
          custom={1}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          Join thousands of families choosing health, quality, and pure taste.
        </motion.p>

        {/* CTA Button with multiple interactions */}
        <motion.button 
          className="cta-button"
          variants={buttonVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            animate={{ opacity: [1, 0.8, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Order Now
          </motion.span>
        </motion.button>

        {/* Decorative badges */}
        <motion.div 
          className="cta-badges"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {['🚚 Free Shipping', '🛡️ 30-Day Guarantee', '⭐ Premium Quality'].map((badge, i) => (
            <motion.div 
              key={i}
              className="badge"
              whileHover={{ scale: 1.1 }}
            >
              {badge}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default CTA
