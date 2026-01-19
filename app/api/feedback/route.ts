import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

// Use /tmp for Vercel serverless functions (writable), fallback to data/ for local dev
const isVercel = process.env.VERCEL === '1'
const DATA_FILE = isVercel
  ? path.join('/tmp', 'feedbacks.json')
  : path.join(process.cwd(), 'data', 'feedbacks.json')

// Ensure data directory exists (only for local dev)
function ensureDataDirectory() {
  if (!isVercel) {
    const dataDir = path.dirname(DATA_FILE)
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }
  }
}

// Read feedbacks from file
function readFeedbacks() {
  ensureDataDirectory()
  if (!fs.existsSync(DATA_FILE)) {
    return []
  }
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading feedbacks:', error)
    return []
  }
}

// Write feedbacks to file
function writeFeedbacks(feedbacks: any[]) {
  ensureDataDirectory()
  fs.writeFileSync(DATA_FILE, JSON.stringify(feedbacks, null, 2))
}

// GET - Fetch all feedbacks
export async function GET() {
  try {
    const feedbacks = readFeedbacks()
    return NextResponse.json({ feedbacks })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch feedbacks' },
      { status: 500 }
    )
  }
}

// POST - Create new feedback
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, rating, message } = body

    // Validation
    if (!name || !email || !rating || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }

    // Create feedback object
    const feedback = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      name,
      email,
      rating: Number(rating),
      message,
      createdAt: new Date().toISOString(),
    }

    // Read existing feedbacks
    const feedbacks = readFeedbacks()

    // Add new feedback
    feedbacks.push(feedback)

    // Write back to file
    writeFeedbacks(feedbacks)

    return NextResponse.json(
      { message: 'Feedback submitted successfully', feedback },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error creating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}
