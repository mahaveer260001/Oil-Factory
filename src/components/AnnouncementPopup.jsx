import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './AnnouncementPopup.css'

const API = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export default function AnnouncementPopup() {
  const [popup, setPopup] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    let isMounted = true

    async function fetchActivePopup() {
      try {
        const res = await fetch(`${API}/api/popups/active`)
        if (!res.ok) return
        const json = await res.json()
        const popupData = json.data

        if (popupData && popupData.is_active && isMounted) {
          // Check session storage if show_once_per_session is enabled
          if (popupData.show_once_per_session) {
            const dismissedKey = `popup_dismissed_${popupData.id}`
            if (sessionStorage.getItem(dismissedKey)) {
              return
            }
          }

          setPopup(popupData)
          setIsVisible(true)
        }
      } catch (err) {
        console.log('No active website popup found or backend offline:', err)
      }
    }

    fetchActivePopup()

    return () => {
      isMounted = false
    }
  }, [])

  const handleClose = () => {
    setIsVisible(false)
    if (popup && popup.show_once_per_session) {
      sessionStorage.setItem(`popup_dismissed_${popup.id}`, 'true')
    }
  }

  const handleAction = () => {
    handleClose()
    // Always open the site's QR scanner instead of an external link
    window.dispatchEvent(new CustomEvent('open-scanner'))
  }

  if (!popup || !isVisible) return null

  const imageUrl = popup.image_url
    ? popup.image_url.startsWith('http') || popup.image_url.startsWith('data:')
      ? popup.image_url
      : `${API}${popup.image_url}`
    : null

  return (
    <AnimatePresence>
      <div className="popup-backdrop" onClick={(e) => {
        if (e.target === e.currentTarget) handleClose()
      }}>
        <motion.div
          className="popup-card"
          initial={{ opacity: 0, scale: 0.85, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        >
          {/* Close Button */}
          <button className="popup-close-btn" onClick={handleClose} aria-label="Close Announcement">
            ✕
          </button>

          {/* Announcement Tag */}
          <div className="popup-badge">
            <span>✨ Special Offer</span>
          </div>

          {/* Image Banner */}
          {imageUrl && (
            <div className="popup-image-container">
              <img src={imageUrl} alt={popup.title} className="popup-banner-img" />
            </div>
          )}

          {/* Content Body */}
          <div className="popup-content">
            <h3 className="popup-title">{popup.title}</h3>
            {popup.description && (
              <p className="popup-description">{popup.description}</p>
            )}

            {/* Action Buttons */}
            <div className="popup-actions">
              {popup.button_text && (
                <button className="popup-cta-btn" onClick={handleAction}>
                  {popup.button_text}
                </button>
              )}
              <button className="popup-dismiss-btn" onClick={handleClose}>
                Dismiss
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
