import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/AvailableOn.css'

const AvailableOn = () => {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  const partners = [
    {
      name: 'Blinkit',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Blinkit-yellow-app-icon.svg',
      height: '45px',
      link: null
    },
    {
      name: 'IndiaMART',
      logo: './images/indiamart.png',
      height: '40px',
      link: 'https://m.indiamart.com/mateshwari-industries-sirohi/aboutus.html'
    },
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      height: '40px',
      link: null
    }
  ]

  return (
    <section className="available-on-section" ref={ref}>
      <div className="available-on-container">
        <motion.div 
          className="available-on-content"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="available-text-container">
            <span className="available-badge">Everywhere you need us</span>
            <h3 className="available-title">Find Gold Mairani Products Online</h3>
            <p className="available-subtitle">Now delivering purity straight to your doorstep through our trusted partners.</p>
          </div>
          
          <div className="available-logos">
            {partners.map((partner, index) => {
              const cardProps = {
                key: partner.name,
                className: "partner-card",
                initial: { opacity: 0, scale: 0.8 },
                animate: inView ? { opacity: 1, scale: 1 } : {},
                transition: { duration: 0.5, delay: 0.2 + (index * 0.1) },
                whileHover: { y: -5, boxShadow: '0 10px 25px rgba(212, 175, 55, 0.15)' }
              };

              const CardContent = (
                <img 
                  src={partner.logo} 
                  alt={partner.name} 
                  style={{ height: partner.height, objectFit: 'contain' }} 
                />
              );

              if (partner.link) {
                return (
                  <motion.a 
                    {...cardProps}
                    href={partner.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {CardContent}
                  </motion.a>
                );
              }

              return (
                <motion.div {...cardProps}>
                  {CardContent}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AvailableOn
