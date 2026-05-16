import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './ScannerPage.css'

export default function ScannerPage({ onClose }) {
  const [scanStatus, setScanStatus] = useState('idle') // idle | scanning | success | error
  const [errorMsg, setErrorMsg] = useState('')
  const [lastCode, setLastCode] = useState('')
  const scannerRef = useRef(null)
  const html5QrRef = useRef(null)
  const navigate = useNavigate()

  const startScanner = async () => {
    setScanStatus('scanning')
    setErrorMsg('')

    try {
      const { Html5Qrcode } = await import('html5-qrcode')

      if (html5QrRef.current) {
        try { await html5QrRef.current.stop() } catch {}
      }

      const scanner = new Html5Qrcode('sc-reader')
      html5QrRef.current = scanner

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: (w, h) => {
            const size = Math.min(w, h) * 0.7
            return { width: size, height: size }
          },
          aspectRatio: 1.0,
        },
        (decodedText) => {
          // QR decoded!
          setLastCode(decodedText)
          scanner.stop().catch(() => {})

          // Extract code from URL /r/<code> or use raw text
          const match = decodedText.match(/\/r\/([A-Z0-9]+)$/i)
          if (match) {
            setScanStatus('success')
            setTimeout(() => {
              navigate(`/r/${match[1].toUpperCase()}`)
              if (onClose) onClose()
            }, 800)
          } else if (/^QR\d+[A-Z0-9]+$/i.test(decodedText.trim())) {
            setScanStatus('success')
            setTimeout(() => {
              navigate(`/r/${decodedText.trim().toUpperCase()}`)
              if (onClose) onClose()
            }, 800)
          } else {
            // Try navigating anyway with raw text
            setScanStatus('success')
            setTimeout(() => {
              navigate(`/r/${encodeURIComponent(decodedText.trim())}`)
              if (onClose) onClose()
            }, 800)
          }
        },
        (err) => {
          // Ignore scan errors (just means no QR found yet)
        }
      )
    } catch (err) {
      console.error('Scanner error:', err)
      setScanStatus('error')
      if (err?.message?.includes('permission')) {
        setErrorMsg('Camera permission denied. Please allow camera access and try again.')
      } else {
        setErrorMsg('Could not start camera. Please check your device and try again.')
      }
    }
  }

  const stopScanner = async () => {
    if (html5QrRef.current) {
      try { await html5QrRef.current.stop() } catch {}
      html5QrRef.current = null
    }
    setScanStatus('idle')
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (html5QrRef.current) {
        html5QrRef.current.stop().catch(() => {})
      }
    }
  }, [])

  return (
    <div className="sc-wrap">
      {/* Animated background */}
      <div className="sc-bg">
        <div className="sc-orb sc-orb--1" />
        <div className="sc-orb sc-orb--2" />
        <div className="sc-orb sc-orb--3" />
      </div>

      {/* Close button */}
      {onClose && (
        <button className="sc-close-btn" onClick={() => { stopScanner(); onClose() }}>✕</button>
      )}

      <div className="sc-container">
        {/* Header */}
        <div className="sc-header">
          <div className="sc-icon-wrap">
            <span className="sc-icon"></span>
            <div className="sc-icon-pulse" />
          </div>
          <h1 className="sc-title">Scan QR Code</h1>
          <p className="sc-subtitle">
            Scan the QR code on your <strong>Gold Mairani</strong> oil bottle to claim your reward
          </p>
        </div>

        {/* Scanner Area */}
        <div className="sc-reader-wrap">
          <div
            id="sc-reader"
            className={`sc-reader ${scanStatus === 'scanning' ? 'sc-reader--active' : ''}`}
            ref={scannerRef}
          />

          {/* Overlay when idle */}
          {scanStatus === 'idle' && (
            <div className="sc-overlay-idle">
              <div className="sc-idle-icon"></div>
              <p>Camera preview will appear here</p>
            </div>
          )}

          {/* Success overlay */}
          {scanStatus === 'success' && (
            <div className="sc-overlay-success">
              <div className="sc-success-icon">✓</div>
              <p>QR Code Detected!</p>
              <p className="sc-redirecting">Redirecting…</p>
            </div>
          )}

          {/* Corner frames */}
          <div className="sc-corner sc-corner--tl" />
          <div className="sc-corner sc-corner--tr" />
          <div className="sc-corner sc-corner--bl" />
          <div className="sc-corner sc-corner--br" />

          {/* Scanning line animation */}
          {scanStatus === 'scanning' && (
            <div className="sc-scan-line" />
          )}
        </div>

        {/* Status */}
        {scanStatus === 'scanning' && (
          <div className="sc-status sc-status--scanning">
            <span className="sc-status-dot" />
            Scanning… Point camera at QR code on bottle
          </div>
        )}

        {scanStatus === 'error' && (
          <div className="sc-status sc-status--error">
            {errorMsg}
          </div>
        )}

        {/* Buttons */}
        <div className="sc-actions">
          {scanStatus === 'idle' || scanStatus === 'error' ? (
            <button className="sc-btn sc-btn--primary" onClick={startScanner}>
              Start Scanning
            </button>
          ) : scanStatus === 'scanning' ? (
            <button className="sc-btn sc-btn--secondary" onClick={stopScanner}>
              ✕ Stop Scanner
            </button>
          ) : null}
        </div>

        {/* Manual entry */}
        <div className="sc-manual">
          <p>Don't have camera access?</p>
          <ManualEntry onSubmit={(code) => { navigate(`/r/${code}`); if (onClose) onClose() }} />
        </div>

        {/* How it works */}
        <div className="sc-how">
          <h3>How to claim your reward</h3>
          <div className="sc-steps">
            <div className="sc-step">
              <span className="sc-step-num">1</span>
              <p>Find the QR code on your <strong>Gold Mairani</strong> oil tin/bottle</p>
            </div>
            <div className="sc-step">
              <span className="sc-step-num">2</span>
              <p>Click <strong>Start Scanning</strong> and point camera at QR code</p>
            </div>
            <div className="sc-step">
              <span className="sc-step-num">3</span>
              <p>Fill in your details and submit your entry</p>
            </div>
            <div className="sc-step">
              <span className="sc-step-num">4</span>
              <p>Wait for the announcement — you could win exciting prizes!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ManualEntry({ onSubmit }) {
  const [code, setCode] = useState('')
  const [show, setShow] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const trimmed = code.trim().toUpperCase()
    if (trimmed.length > 3) {
      onSubmit(trimmed)
    }
  }

  if (!show) {
    return (
      <button className="sc-manual-toggle" onClick={() => setShow(true)}>
        Enter code manually →
      </button>
    )
  }

  return (
    <form className="sc-manual-form" onSubmit={handleSubmit}>
      <input
        value={code}
        onChange={e => setCode(e.target.value)}
        placeholder="Enter QR code (e.g. QR1000001ABCD1234)"
        className="sc-manual-input"
        autoFocus
      />
      <button type="submit" className="sc-btn sc-btn--small">Go →</button>
    </form>
  )
}
