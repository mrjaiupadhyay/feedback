'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

interface Feedback {
  id: string
  name: string
  email: string
  rating: number
  message: string
  createdAt: string
}

export default function FeedbacksPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchFeedbacks()
  }, [])

  const fetchFeedbacks = async () => {
    try {
      const response = await fetch('/api/feedback')
      if (response.ok) {
        const data = await response.json()
        setFeedbacks(data.feedbacks || [])
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getRatingEmoji = (rating: number) => {
    if (rating === 1) return '😞'
    if (rating === 2) return '😐'
    if (rating === 3) return '🙂'
    if (rating === 4) return '😊'
    return '😍'
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
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
        <h1 style={{ marginBottom: '2rem', color: '#111827' }}>All Feedbacks</h1>

        {isLoading ? (
          <div className="empty-state">Loading feedbacks...</div>
        ) : feedbacks.length === 0 ? (
          <div className="empty-state">
            <p>No feedbacks yet. Be the first to share your thoughts!</p>
            <Link href="/">
              <button className="btn" style={{ marginTop: '1rem' }}>
                Submit Feedback
              </button>
            </Link>
          </div>
        ) : (
          <div>
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-item">
                <div className="feedback-header">
                  <span className="feedback-name">{feedback.name}</span>
                  <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
                </div>
                <div className="feedback-rating">
                  {getRatingEmoji(feedback.rating)} Rating: {feedback.rating}/5
                </div>
                <div className="feedback-message">{feedback.message}</div>
                <div style={{ marginTop: '0.5rem', fontSize: '0.875rem', color: '#9ca3af' }}>
                  {feedback.email}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
