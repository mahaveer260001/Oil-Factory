import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/Testimonials.css'

const Testimonials = () => {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true
  })

  const [activeIndex, setActiveIndex] = useState(0)

  // Testimonial data
  const testimonials = [
    {
      id: 1,
      name: 'Sarah Mitchell',
      role: 'Health Coach',
      content: 'This oil has transformed how I cook for my family. The quality is exceptional and the taste is pure perfection. Highly recommended!',
      avatar: '👩‍⚕️',
      rating: 5
    },
    {
      id: 2,
      name: 'David Johnson',
      role: 'Chef',
      content: 'As a professional chef, I only use premium oils. This brand delivers on every front – quality, flavor, and health benefits.',
      avatar: '👨‍🍳',
      rating: 5
    },
    {
      id: 3,
      name: 'Emily Chen',
      role: 'Wellness Blogger',
      content: 'Cold-pressed perfection. My energy levels have never been better since switching to this oil. Great investment in health!',
      avatar: '💪',
      rating: 5
    }
  ]

  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 }
    }
  }

  // Slide animation
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: [0.34, 1.56, 0.64, 1]
      }
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      transition: {
        duration: 0.6
      }
    })
  }

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="testimonials" ref={ref}>
      <motion.div 
        className="testimonials-container"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {/* Section heading */}
        <motion.div 
          className="testimonials-header"
          initial={{ opacity: 0, y: -20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <h2 className="testimonials-title">Loved by Our Community</h2>
          <p className="testimonials-subtitle">See what our customers are saying</p>
        </motion.div>

        {/* Testimonials slider */}
        <div className="slider-wrapper">
          <AnimatePresence initial={false} custom={activeIndex} mode="wait">
            <motion.div
              key={activeIndex}
              custom={activeIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="testimonial-card"
            >
              {/* Star rating */}
              <motion.div 
                className="rating"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                {Array(testimonials[activeIndex].rating)
                  .fill(0)
                  .map((_, i) => (
                    <span key={i} className="star">★</span>
                  ))}
              </motion.div>

              {/* Quote text */}
              <motion.p 
                className="testimonial-text"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                "{testimonials[activeIndex].content}"
              </motion.p>

              {/* Author info */}
              <motion.div 
                className="author-info"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <div className="author-avatar">
                  {testimonials[activeIndex].avatar}
                </div>
                <div className="author-details">
                  <p className="author-name">{testimonials[activeIndex].name}</p>
                  <p className="author-role">{testimonials[activeIndex].role}</p>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation buttons */}
          <motion.button 
            className="slider-btn prev-btn"
            onClick={prevTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Previous testimonial"
          >
            ‹
          </motion.button>

          <motion.button 
            className="slider-btn next-btn"
            onClick={nextTestimonial}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Next testimonial"
          >
            ›
          </motion.button>
        </div>

        {/* Slider indicators */}
        <motion.div 
          className="slider-indicators"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {testimonials.map((_, index) => (
            <motion.button
              key={index}
              className={`indicator ${index === activeIndex ? 'active' : ''}`}
              onClick={() => setActiveIndex(index)}
              whileHover={{ scale: 1.2 }}
              transition={{ duration: 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

export default Testimonials
