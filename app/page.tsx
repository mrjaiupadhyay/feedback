'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function Home() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rating: 0,
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)

  const handleRatingClick = (rating: number) => {
    setFormData({ ...formData, rating })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setMessage(null)

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setMessage({ type: 'success', text: 'Thank you for your feedback!' })
        setFormData({ name: '', email: '', rating: 0, message: '' })
        setTimeout(() => {
          router.push('/feedbacks')
        }, 1500)
      } else {
        setMessage({ type: 'error', text: 'Failed to submit feedback. Please try again.' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container">
      <nav className="nav">
        <Link href="/" className="nav-link">
          Submit Feedback
        </Link>
        <Link href="/feedbacks" className="nav-link">
          View Feedbacks
        </Link>
      </nav>

      <div className="card">
        <h1 style={{ marginBottom: '2rem', color: '#111827' }}>Share Your Feedback</h1>

        {message && (
          <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label className="label" htmlFor="name">
              Name *
            </label>
            <input
              className="input"
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Your name"
            />
          </div>

          <div className="input-group">
            <label className="label" htmlFor="email">
              Email *
            </label>
            <input
              className="input"
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="your.email@example.com"
            />
          </div>

          <div className="input-group">
            <label className="label">Rating *</label>
            <div className="rating-group">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  type="button"
                  className={`rating-btn ${formData.rating === rating ? 'active' : ''}`}
                  onClick={() => handleRatingClick(rating)}
                >
                  {rating === 1 ? '😞' : rating === 2 ? '😐' : rating === 3 ? '🙂' : rating === 4 ? '😊' : '😍'}
                </button>
              ))}
            </div>
            {formData.rating > 0 && (
              <p style={{ marginTop: '0.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                Selected: {formData.rating} out of 5
              </p>
            )}
          </div>

          <div className="input-group">
            <label className="label" htmlFor="message">
              Your Feedback *
            </label>
            <textarea
              className="textarea"
              id="message"
              required
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell us what you think..."
            />
          </div>

          <button type="submit" className="btn" disabled={isSubmitting || formData.rating === 0}>
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </button>
        </form>
      </div>
    </div>
  )
}
