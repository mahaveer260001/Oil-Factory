import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/Story.css'

const Story = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  // Text animation from left
  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
    }
  }

  // Image animation from right with rotation
  const imageVariants = {
    hidden: { opacity: 0, x: 50, rotateY: 20 },
    visible: {
      opacity: 1,
      x: 0,
      rotateY: 0,
      transition: { duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }
    }
  }

  return (
    <section className="story" ref={ref}>
      <motion.div 
        className="story-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Left content - Text */}
        <motion.div 
          className="story-content"
          variants={textVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <h2 className="story-title">Our Journey to Wellness</h2>
          
          <p className="story-text">
            For generations, our family has been dedicated to producing the finest cooking oil. 
            What started as a passion for quality has grown into a commitment to bringing pure, 
            nutritious oils to families across the world.
          </p>

          <p className="story-text">
            Every bottle is crafted with care, using traditional cold-pressing methods that 
            preserve the natural nutrients and rich flavor. We believe that good health starts 
            in the kitchen, and we're honored to be part of your family's healthy journey.
          </p>

          <motion.ul 
            className="story-list"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {[
              '30+ years of expertise',
              'Certified organic & fair-trade',
              'Laboratory tested for purity',
              'Sourced from premium farms'
            ].map((item, index) => (
              <motion.li 
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              >
                <span className="list-icon">✓</span>
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right content - Image with hover effect */}
        <motion.div 
          className="story-image"
          variants={imageVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          whileHover={{ scale: 1.05 }}
        >
          {/* Placeholder with gradient and decorative elements */}
          <div className="image-wrapper">
            <motion.div 
              className="image-box"
              animate={{ 
                backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
              }}
              transition={{ 
                duration: 8, 
                repeat: Infinity,
                ease: 'linear'
              }}
              style={{
                backgroundImage: 'linear-gradient(135deg, #F4D03F 0%, #D4AF37 50%, #FFF9E6 100%)',
                backgroundSize: '200% 200%'
              }}
            >
              {/* Decorative oil bottle illustration inside */}
              <svg 
                viewBox="0 0 300 400" 
                xmlns="http://www.w3.org/2000/svg"
                className="story-bottle"
              >
                {/* Large bottle for story section */}
                <circle cx="150" cy="50" r="20" fill="#2D3436"/>
                <rect x="130" y="65" width="40" height="10" fill="#2D3436" rx="2"/>
                <path 
                  d="M 130 75 Q 125 95 125 120 L 175 120 Q 175 95 170 75 Z" 
                  fill="#FFF9E6" 
                  stroke="#8B7500" 
                  strokeWidth="2"
                />
                <path 
                  d="M 125 120 Q 100 160 100 260 Q 100 340 138 380 L 162 380 Q 200 340 200 260 Q 200 160 175 120 Z" 
                  fill="#FFF9E6" 
                  stroke="#8B7500" 
                  strokeWidth="2"
                />
                
                {/* Oil fill */}
                <defs>
                  <linearGradient id="storyOilGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" style={{ stopColor: '#F4D03F', stopOpacity: 1 }} />
                    <stop offset="100%" style={{ stopColor: '#8B7500', stopOpacity: 0.9 }} />
                  </linearGradient>
                </defs>
                <path 
                  d="M 105 260 Q 105 310 138 370 L 162 370 Q 195 310 195 260 Z" 
                  fill="url(#storyOilGrad)"
                  opacity="0.8"
                />
                
                {/* Shine */}
                <ellipse cx="130" cy="180" rx="15" ry="60" fill="white" opacity="0.1"/>
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Story
