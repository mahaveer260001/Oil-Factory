import React from 'react'
import { motion } from 'framer-motion'
import '../styles/Footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  // Footer link animation
  const linkVariants = {
    initial: { opacity: 0, x: -10 },
    whileHover: { x: 5, opacity: 1 }
  }

  // Column animation
  const columnVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5
      }
    })
  }

  return (
    <footer className="footer">
      <motion.div 
        className="footer-container"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '0px 0px -100px 0px' }}
      >
        {/* Main footer content */}
        <div className="footer-grid">
          {/* Brand column */}
          <motion.div 
            className="footer-col"
            variants={columnVariants}
            custom={0}
          >
            <h3 className="footer-brand">Pure Oil Co.</h3>
            <p className="footer-desc">
              Crafting premium, cold-pressed oils for health-conscious families since 1993.
            </p>
            {/* Social links */}
            <div className="social-links">
              {['facebook', 'instagram', 'twitter'].map((social, i) => (
                <motion.a
                  key={i}
                  href="#"
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  aria-label={social}
                >
                  {social[0].toUpperCase()}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Product links */}
          <motion.div 
            className="footer-col"
            variants={columnVariants}
            custom={1}
          >
            <h4 className="footer-col-title">Product</h4>
            <ul className="footer-links">
              {['All Oils', 'Recipes', 'Health Benefits', 'Sustainability'].map((item, i) => (
                <li key={i}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    whileHover="whileHover"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company links */}
          <motion.div 
            className="footer-col"
            variants={columnVariants}
            custom={2}
          >
            <h4 className="footer-col-title">Company</h4>
            <ul className="footer-links">
              {['About Us', 'Blog', 'Careers', 'Press'].map((item, i) => (
                <li key={i}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    whileHover="whileHover"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support links */}
          <motion.div 
            className="footer-col"
            variants={columnVariants}
            custom={3}
          >
            <h4 className="footer-col-title">Support</h4>
            <ul className="footer-links">
              {['Contact', 'FAQ', 'Shipping Info', 'Returns'].map((item, i) => (
                <li key={i}>
                  <motion.a
                    href="#"
                    variants={linkVariants}
                    whileHover="whileHover"
                  >
                    {item}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
        />

        {/* Bottom section */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="copyright">
            © {currentYear} Pure Oil Co. All rights reserved.
          </p>
          <div className="footer-legal">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  )
}

export default Footer
