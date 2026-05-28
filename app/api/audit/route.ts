import { after } from 'next/server'
import { getSupabaseClient } from '@/lib/supabase'
import { runAuditAgent } from '@/lib/audit-agent'

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { businessName, websiteUrl, location, email } = body as Record<string, string>

  if (!businessName?.trim() || !websiteUrl?.trim() || !location?.trim() || !email?.trim()) {
    return Response.json({ error: 'All fields are required.' }, { status: 400 })
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Invalid email address.' }, { status: 400 })
  }

  const supabase = getSupabaseClient()
  const { data: lead, error } = await supabase
    .from('leads')
    .insert({ business_name: businessName.trim(), website_url: websiteUrl.trim(), location: location.trim(), email: email.trim().toLowerCase() })
    .select()
    .single()

  if (error || !lead) {
    console.error('[api/audit] supabase insert error:', error)
    return Response.json({ error: 'Failed to save your request. Please try again.' }, { status: 500 })
  }

  after(async () => {
    await runAuditAgent(lead)
  })

  return Response.json({ success: true })
}
