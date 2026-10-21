import type { Handler, HandlerEvent } from '@netlify/functions'
import { JWT } from 'google-auth-library'

const MAX_GUESTS = 4
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const RSVP_TIMEZONE = 'America/Argentina/Buenos_Aires'

/** Human-readable local time for the wedding region (stored as plain text in column A). */
function formatRsvpTimestamp(date: Date) {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: RSVP_TIMEZONE,
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date)
}

interface RsvpBody {
  name?: string
  email?: string
  attending?: string
  guests?: number | string
  recovery?: string
  shuttle?: string
  message?: string
  language?: string
}

function json(statusCode: number, body: Record<string, unknown>) {
  return {
    statusCode,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }
}

function parseBody(event: HandlerEvent): RsvpBody | null {
  if (!event.body) return null
  try {
    return JSON.parse(event.body) as RsvpBody
  } catch {
    return null
  }
}

function validate(body: RsvpBody): { ok: true; data: NormalizedRsvp } | { ok: false; error: string } {
  const name = body.name?.trim() ?? ''
  const email = body.email?.trim() ?? ''
  const attending = body.attending === 'yes' || body.attending === 'no' ? body.attending : ''

  if (!name) return { ok: false, error: 'Name is required.' }
  if (!EMAIL_RE.test(email)) return { ok: false, error: 'A valid email is required.' }
  if (!attending) return { ok: false, error: 'Attending choice is required.' }

  let guests = Number(body.guests)
  if (attending === 'yes') {
    if (!Number.isFinite(guests)) guests = 1
    guests = Math.min(MAX_GUESTS, Math.max(1, Math.round(guests)))
  } else {
    guests = 0
  }

  const yesNo = (v: string | undefined) => (v === 'yes' || v === 'no' ? v : '')

  return {
    ok: true,
    data: {
      name,
      email,
      attending,
      guests,
      recovery: attending === 'yes' ? yesNo(body.recovery) : '',
      shuttle: attending === 'yes' ? yesNo(body.shuttle) : '',
      message: (body.message ?? '').trim().slice(0, 2000),
      language: (body.language ?? '').trim().slice(0, 8),
    },
  }
}

interface NormalizedRsvp {
  name: string
  email: string
  attending: 'yes' | 'no'
  guests: number
  recovery: '' | 'yes' | 'no'
  shuttle: '' | 'yes' | 'no'
  message: string
  language: string
}

function normalizePrivateKey(raw: string) {
  let key = raw.trim()
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) {
    key = key.slice(1, -1)
  }
  return key.replace(/\\n/g, '\n')
}

function sheetsConfig() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim()
  const rawKey = process.env.GOOGLE_PRIVATE_KEY
  const sheetId = process.env.GOOGLE_SHEET_ID?.trim()
  const range = process.env.GOOGLE_SHEET_RANGE?.trim() || 'Sheet1!A:F'
  if (!email || !rawKey || !sheetId) return null
  return { email, key: normalizePrivateKey(rawKey), sheetId, range }
}

async function appendToSheet(row: string[]) {
  const config = sheetsConfig()
  if (!config) {
    throw new Error('CONFIG_MISSING')
  }

  const { email, key, sheetId, range } = config

  const auth = new JWT({
    email,
    key,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })
  const { token } = await auth.getAccessToken()
  if (!token) throw new Error('Could not obtain Google access token.')

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ values: [row] }),
  })

  if (!res.ok) {
    const detail = await res.text()
    throw new Error(`Google Sheets API error (${res.status}): ${detail.slice(0, 200)}`)
  }
}

export const handler: Handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: { Allow: 'POST, OPTIONS' }, body: '' }
  }

  if (event.httpMethod !== 'POST') {
    return json(405, { error: 'Method not allowed.' })
  }

  const body = parseBody(event)
  if (!body) return json(400, { error: 'Invalid JSON body.' })

  const checked = validate(body)
  if (!checked.ok) return json(400, { error: checked.error })

  const { data } = checked
  const row = [
    formatRsvpTimestamp(new Date()),
    data.name,
    data.email,
    data.attending,
    String(data.guests),
    data.recovery,
  ]

  const config = sheetsConfig()
  if (!config) {
    console.error('submit-rsvp: missing GOOGLE_* environment variables')
    return json(503, {
      error: 'RSVP storage is not configured on the server. Add Google Sheets env vars in Netlify and redeploy.',
    })
  }

  try {
    await appendToSheet(row)
    return json(200, { ok: true })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('submit-rsvp:', message)
    if (message === 'CONFIG_MISSING') {
      return json(503, {
        error: 'RSVP storage is not configured on the server. Add Google Sheets env vars in Netlify and redeploy.',
      })
    }
    if (message.includes('Google Sheets API error (403)')) {
      return json(502, {
        error: 'Could not write to the spreadsheet. Share the sheet with the service account email as Editor.',
      })
    }
    if (message.includes('Google Sheets API error (404)')) {
      return json(502, {
        error: 'Spreadsheet not found. Check GOOGLE_SHEET_ID and GOOGLE_SHEET_RANGE (tab name).',
      })
    }
    if (message.includes('Could not obtain Google access token')) {
      return json(502, {
        error: 'Google credentials rejected. Check GOOGLE_PRIVATE_KEY formatting in Netlify.',
      })
    }
    return json(500, { error: 'Could not save RSVP. Please try again later.' })
  }
}
