import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import '../styles/About.css'

const About = () => {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className="about-section" id="about" ref={ref}>
      <div className="section-container">
        <div className="about-layout">
          {/* Left — Logo & Branding */}
          <motion.div
            className="about-visual"
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="about-logo-frame">
              <img src="./images/logo.jpeg" alt="Mateshwari Industries Logo" className="about-logo" />
              <div className="about-logo-glow" />
            </div>

            {/* Stats */}
            <div className="about-stats">
              {[
                { number: '3+', label: 'Product Range' },
                { number: '1000+', label: 'Happy Families' },
                { number: '100%', label: 'Pure Quality' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  className="about-stat"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                >
                  <span className="stat-number">{stat.number}</span>
                  <span className="stat-label">{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Content */}
          <motion.div
            className="about-content"
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="about-eyebrow">About Us</span>
            <h2 className="about-title">
              <span className="gold-text">Mateshwari Industries</span>
              <br />
              <span className="about-title-sub">A Legacy of Pure Cooking Oils</span>
            </h2>

            <p className="about-text">
              <strong>Mateshwari Industries</strong> is a trusted manufacturer of high-quality mustard oil, committed to delivering purity and excellence to its customers. Since its establishment in 1998, the company has focused on producing premium mustard oil using carefully selected mustard seeds and modern processing techniques.
            </p>

            <p className="about-text">
              Our mission is to provide healthy, pure, and nutritious edible oil while maintaining the highest standards of quality, integrity, and customer satisfaction. We value trust, transparency, and continuous improvement in everything we do.
            </p>

            <p className="about-text">
              What makes our products unique is their natural purity, rich aroma, authentic taste, and strict quality control processes. At Mateshwari Industries, we strive to bring the goodness of traditional mustard oil to every household under our trusted brand — <strong>Gold Mairani</strong>.
            </p>

            <div className="about-highlights">
              {[
                'FSSAI Certified & Quality Tested',
                'Traditional Kachi Ghani Process',
                'Available in Multiple Pack Sizes',
                'Trusted by Families Across India',
              ].map((item, i) => (
                <motion.div
                  key={i}
                  className="about-highlight"
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <span className="highlight-check">✓</span>
                  <span>{item}</span>
                </motion.div>
              ))}
            </div>

            {/* FSSAI License Badge Section */}
            <div className="about-fssai-license">
              <div className="fssai-badge-container" style={{ background: '#fff', border: 'none', padding: '6px', width: '56px', height: '56px' }}>
                <img
                  src="./images/fssai-logo.png"
                  alt="FSSAI Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div className="fssai-text-details">
                <span className="fssai-label">FSSAI CERTIFIED</span>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Food Safety &amp; Standards Authority of India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* 15-Year Visual Interactive Timeline */}
        <div className="about-timeline-section">
          <div className="timeline-header">
            <span className="timeline-eyebrow">Milestones</span>
            <h3 className="timeline-main-title">Celebrating 15 Years of Purity & Trust</h3>
            <p className="timeline-subtitle">A legacy of delivering healthy cooking oils to Indian families since 1998</p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line" />
            <div className="timeline-items">
              {[
                {
                  year: "1998",
                  title: "Foundation & Genesis",
                  desc: "Started as a traditional cold-pressing expeller unit in Rajasthan, processing premium local mustard seeds for local families."
                },
                {
                  year: "2015",
                  title: "Gold Mairani Brand Launch",
                  desc: "Launched our flagship consumer packaging brand, Gold Mairani, packaging pure Kachi Ghani Mustard Oil in retail sizes."
                },
                {
                  year: "2019",
                  title: "Refinery Expansion",
                  desc: "Established a modern multi-oil refinery, expanding into refined Soya Bean and Premium Cottonseed oils for daily home cooking."
                },
                {
                  year: "2023",
                  title: "European Automated Hygienic Lines",
                  desc: "Commissioned fully automated European standard bottling and tin sealing lines, gaining prestigious national FSSAI verification."
                },
                {
                  year: "2026",
                  title: "Smart Digital Campaigns & Beyond",
                  desc: "Upgraded our consumer experience with eco-friendly tin packagings and active digital QR code claim rewards for every household."
                }
              ].map((milestone, idx) => (
                <motion.div
                  key={idx}
                  className={`timeline-item ${idx % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + idx * 0.15, duration: 0.6 }}
                >
                  <div className="timeline-dot">
                    <span className="timeline-dot-inner" />
                  </div>
                  <div className="timeline-card">
                    <span className="timeline-year">{milestone.year}</span>
                    <h4 className="timeline-title">{milestone.title}</h4>
                    <p className="timeline-desc">{milestone.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
