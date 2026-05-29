import { getSupabaseClient } from '@/lib/supabase'

// Simple CSV parser — expects header row: business_name,website_url,email,location,industry,cms
function parseCsv(text: string): Record<string, string>[] {
  const lines = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n').trim().split('\n')
  if (lines.length < 2) return []

  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  const rows: Record<string, string>[] = []

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim()
    if (!line) continue
    const values = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    const row: Record<string, string> = {}
    headers.forEach((h, idx) => { row[h] = values[idx] ?? '' })
    if (row.email && row.email.includes('@')) rows.push(row)
  }

  return rows
}

export async function POST(request: Request) {
  let text: string

  const contentType = request.headers.get('content-type') ?? ''

  if (contentType.includes('multipart/form-data')) {
    const form = await request.formData()
    const file = form.get('file') as File | null
    if (!file) return Response.json({ error: 'No file provided.' }, { status: 400 })
    text = await file.text()
  } else {
    // Also accept raw CSV body
    text = await request.text()
  }

  const rows = parseCsv(text)
  if (rows.length === 0) {
    return Response.json({ error: 'No valid rows found. Ensure CSV has email column.' }, { status: 400 })
  }

  const supabase = getSupabaseClient()

  // Upsert on email to avoid duplicates
  const records = rows.map((r) => ({
    business_name: r.business_name || r.name || 'Unknown',
    website_url:   r.website_url || r.website || null,
    email:         r.email.toLowerCase(),
    location:      r.location || r.city || null,
    industry:      r.industry || r.category || null,
    cms:           r.cms || null,
    status:        'new',
  }))

  const { data, error } = await supabase
    .from('contacts')
    .upsert(records, { onConflict: 'email', ignoreDuplicates: true })
    .select('id')

  if (error) {
    console.error('[contacts/import]', error)
    return Response.json({ error: 'Database error.' }, { status: 500 })
  }

  return Response.json({ imported: data?.length ?? 0, parsed: records.length })
}
