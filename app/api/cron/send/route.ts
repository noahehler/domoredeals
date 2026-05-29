import { getSupabaseClient } from '@/lib/supabase'
import { sendCampaignEmail } from '@/lib/email-sender'
import type { Contact, CampaignEmail } from '@/lib/email-sender'

export async function POST() {
  const supabase = getSupabaseClient()

  // Get all active campaigns
  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, daily_limit')
    .eq('status', 'active')

  if (!campaigns?.length) {
    return Response.json({ message: 'No active campaigns.' })
  }

  const results: Record<string, { sent: number; failed: number }> = {}

  for (const campaign of campaigns) {
    const limit: number = campaign.daily_limit ?? 25

    // Count how many already sent today for this campaign
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)

    const { count: sentToday } = await supabase
      .from('sends')
      .select('id', { count: 'exact', head: true })
      .eq('campaign_id', campaign.id)
      .gte('sent_at', todayStart.toISOString())

    const remaining = limit - (sentToday ?? 0)
    if (remaining <= 0) {
      results[campaign.id] = { sent: 0, failed: 0 }
      continue
    }

    // Get the step-1 email template
    const { data: emailTemplate } = await supabase
      .from('campaign_emails')
      .select('*')
      .eq('campaign_id', campaign.id)
      .eq('step', 1)
      .single()

    if (!emailTemplate) continue

    // Get contacts that haven't been emailed yet (status = 'new')
    // and haven't received this campaign's step 1 yet
    const { data: alreadySentIds } = await supabase
      .from('sends')
      .select('contact_id')
      .eq('campaign_id', campaign.id)
      .eq('step', 1)

    const excludeIds = (alreadySentIds ?? []).map((s: { contact_id: string }) => s.contact_id)

    let query = supabase
      .from('contacts')
      .select('*')
      .eq('status', 'new')
      .limit(remaining)

    if (excludeIds.length > 0) {
      query = query.not('id', 'in', `(${excludeIds.join(',')})`)
    }

    const { data: contacts } = await query

    if (!contacts?.length) {
      results[campaign.id] = { sent: 0, failed: 0 }
      continue
    }

    let sent = 0
    let failed = 0

    for (const contact of contacts) {
      const ok = await sendCampaignEmail(contact as Contact, emailTemplate as CampaignEmail)
      ok ? sent++ : failed++
      // Small delay to stay within Resend rate limits
      await new Promise((r) => setTimeout(r, 200))
    }

    results[campaign.id] = { sent, failed }
  }

  return Response.json({ ok: true, results })
}
