import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/Features.css'

// Features component with scroll-triggered animations
const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  // Feature data
  const features = [
    {
      id: 1,
      icon: '🌿',
      title: '100% Natural',
      description: 'No additives, no preservatives. Pure oil from nature.',
      delay: 0
    },
    {
      id: 2,
      icon: '💪',
      title: 'Rich in Nutrients',
      description: 'Packed with antioxidants and essential fatty acids.',
      delay: 0.2
    },
    {
      id: 3,
      icon: '❄️',
      title: 'Cold Pressed',
      description: 'Traditional method preserves all nutrients.',
      delay: 0.4
    },
    {
      id: 4,
      icon: '❤️',
      title: 'Heart Friendly',
      description: 'Supports cardiovascular health naturally.',
      delay: 0.6
    }
  ]

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  // Individual card animation with scroll trigger
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,
      scale: 0.95
    },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    })
  }

  return (
    <section className="features" ref={ref}>
      <motion.div 
        className="features-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section heading with entrance animation */}
        <motion.div 
          className="features-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="features-title">Why Choose Our Oil?</h2>
          <p className="features-subtitle">Crafted with care for your wellbeing</p>
        </motion.div>

        {/* Features grid with staggered animations */}
        <motion.div className="features-grid">
          {features.map((feature, index) => (
            <motion.div
              key={feature.id}
              className="feature-card"
              variants={cardVariants}
              custom={index}
              whileHover={{
                y: -10,
                boxShadow: '0 20px 40px rgba(244, 208, 63, 0.2)',
                transition: { duration: 0.3 }
              }}
            >
              {/* Icon animation on hover */}
              <motion.div 
                className="feature-icon"
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  transition: { duration: 0.3 }
                }}
              >
                {feature.icon}
              </motion.div>

              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>

              {/* Animated underline on hover */}
              <motion.div 
                className="feature-line"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Features
