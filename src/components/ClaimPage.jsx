import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './ClaimPage.css'

const API = 'http://localhost:5000'

export default function ClaimPage() {
  const { code } = useParams()
  const navigate = useNavigate()

  const [status, setStatus] = useState('validating') // validating | form | submitting | success | error
  const [scheme, setScheme] = useState(null)
  const [qrError, setQrError] = useState('')
  const [formError, setFormError] = useState('')
  const [submissionId, setSubmissionId] = useState(null)

  const [form, setForm] = useState({
    name: '',
    phone: '',
    city: '',
    state: '',
    product_type: '',
  })

  // Validate QR code on load
  useEffect(() => {
    if (!code) { setStatus('error'); setQrError('No QR code provided.'); return }
    fetch(`${API}/api/qr/validate/${code.toUpperCase()}`)
      .then(r => r.json())
      .then(res => {
        if (res.error) { setStatus('error'); setQrError(res.error) }
        else { setScheme(res.data); setStatus('form') }
      })
      .catch(() => { setStatus('error'); setQrError('Cannot connect to server. Please try again.') })
  }, [code])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async e => {
    e.preventDefault()
    setFormError('')
    if (!form.name.trim() || !form.phone.trim() || !form.city.trim()) {
      setFormError('Please fill in all required fields.')
      return
    }
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      setFormError('Enter a valid 10-digit Indian mobile number.')
      return
    }
    setStatus('submitting')
    try {
      const res = await fetch(`${API}/api/qr/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qr_code: code.toUpperCase(),
          name: form.name.trim(),
          phone: form.phone.trim(),
          city: form.city.trim(),
          state: form.state.trim() || null,
          purchase_details: { product_type: form.product_type.trim() || null },
        }),
      })
      const data = await res.json()
      if (data.error) { setFormError(data.error); setStatus('form') }
      else { setSubmissionId(data.data?.submission_id); setStatus('success') }
    } catch {
      setFormError('Submission failed. Please check your connection.')
      setStatus('form')
    }
  }

  // ── Screens ─────────────────────────────────────────────────────────────────
  if (status === 'validating') return (
    <div className="cp-wrap">
      <div className="cp-card">
        <div className="cp-spinner" />
        <p className="cp-checking">Verifying QR code…</p>
      </div>
    </div>
  )

  if (status === 'error') return (
    <div className="cp-wrap">
      <div className="cp-card cp-card--error">
        <div className="cp-icon">✗</div>
        <h1>Invalid QR Code</h1>
        <p>{qrError}</p>
        <p className="cp-hint">If you believe this is a mistake, please contact our support.</p>
      </div>
    </div>
  )

  if (status === 'success') return (
    <div className="cp-wrap">
      <div className="cp-card cp-card--success">
        <div className="cp-icon cp-icon--success">✓</div>
        <h1>Entry Recorded!</h1>
        <p>Thank you, <strong>{form.name}</strong>. Your participation has been registered.</p>
        {submissionId && <p className="cp-ref">Reference ID: <strong>#{submissionId}</strong></p>}
        <div className="cp-success-note">
          <p>🎉 Winners will be announced after the campaign ends.</p>
          <p>We'll contact you on <strong>{form.phone}</strong> if you win.</p>
        </div>
      </div>
    </div>
  )

  // ── Claim Form ───────────────────────────────────────────────────────────────
  return (
    <div className="cp-wrap">
      <div className="cp-card">
        {/* Header */}
        <div className="cp-header">
          <div className="cp-brand">🛢️</div>
          <h1>Claim Your Reward</h1>
          {scheme && <p className="cp-scheme-name">{scheme.scheme_title}</p>}
        </div>

        {/* QR Code Badge */}
        <div className="cp-qr-badge">
          <span className="cp-qr-label">QR Code</span>
          <span className="cp-qr-code">{code?.toUpperCase()}</span>
        </div>

        {/* Reward Info */}
        {scheme?.reward_text && (
          <div className="cp-reward-box">
            <span>🎁</span>
            <span>{scheme.reward_text}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="cp-form">
          <div className="cp-field">
            <label>Full Name <span className="cp-required">*</span></label>
            <input
              name="name" value={form.name} onChange={handleChange}
              placeholder="e.g. Rahul Sharma" required
            />
          </div>
          <div className="cp-field">
            <label>Mobile Number <span className="cp-required">*</span></label>
            <input
              name="phone" value={form.phone} onChange={handleChange}
              placeholder="10-digit mobile number" type="tel"
              maxLength={10} required
            />
          </div>
          <div className="cp-row">
            <div className="cp-field">
              <label>City <span className="cp-required">*</span></label>
              <input
                name="city" value={form.city} onChange={handleChange}
                placeholder="Your city" required
              />
            </div>
            <div className="cp-field">
              <label>State</label>
              <select name="state" value={form.state} onChange={handleChange}>
                <option value="">Select state</option>
                {['Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh'].map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="cp-field">
            <label>Product Type</label>
            <select name="product_type" value={form.product_type} onChange={handleChange}>
              <option value="">Select product</option>
              <option value="mustard_oil">Mustard Oil</option>
              <option value="soyabean_oil">Soyabean Oil</option>
              <option value="cottonseed_oil">Cottonseed Oil</option>
              <option value="other">Other</option>
            </select>
          </div>

          {formError && <div className="cp-error">{formError}</div>}

          <button type="submit" className="cp-submit" disabled={status === 'submitting'}>
            {status === 'submitting' ? (
              <><span className="cp-btn-spinner" /> Submitting…</>
            ) : 'Submit Entry'}
          </button>
        </form>

        <p className="cp-privacy">
          Your information is secure and will only be used for this campaign.
        </p>
      </div>
    </div>
  )
}
