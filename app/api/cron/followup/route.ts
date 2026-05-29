import { getSupabaseClient } from '@/lib/supabase'
import { sendCampaignEmail } from '@/lib/email-sender'
import type { Contact, CampaignEmail } from '@/lib/email-sender'

export async function POST() {
  const supabase = getSupabaseClient()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('id, daily_limit')
    .eq('status', 'active')

  if (!campaigns?.length) return Response.json({ message: 'No active campaigns.' })

  const results: Record<string, { sent: number; skipped: number }> = {}

  for (const campaign of campaigns) {
    // Get all follow-up steps (step > 1), ordered ascending
    const { data: followUpSteps } = await supabase
      .from('campaign_emails')
      .select('*')
      .eq('campaign_id', campaign.id)
      .gt('step', 1)
      .order('step', { ascending: true })

    if (!followUpSteps?.length) continue

    let sent = 0
    let skipped = 0

    for (const step of followUpSteps as CampaignEmail[]) {
      const prevStep = step.step - 1

      // Find contacts who received the previous step and haven't clicked yet,
      // and enough days have passed (delay_days since prev step was sent)
      const cutoff = new Date()
      cutoff.setDate(cutoff.getDate() - step.delay_days)

      // Contacts that got step N-1 before the cutoff
      const { data: prevSends } = await supabase
        .from('sends')
        .select('contact_id, clicked_at')
        .eq('campaign_id', campaign.id)
        .eq('step', prevStep)
        .lte('sent_at', cutoff.toISOString())

      if (!prevSends?.length) continue

      // Exclude those who already clicked (engaged)
      const eligibleContactIds = prevSends
        .filter((s: { clicked_at: string | null }) => !s.clicked_at)
        .map((s: { contact_id: string }) => s.contact_id)

      if (!eligibleContactIds.length) continue

      // Exclude contacts who already received this step
      const { data: alreadySent } = await supabase
        .from('sends')
        .select('contact_id')
        .eq('campaign_id', campaign.id)
        .eq('step', step.step)
        .in('contact_id', eligibleContactIds)

      const alreadySentIds = new Set((alreadySent ?? []).map((s: { contact_id: string }) => s.contact_id))
      const toSendIds = eligibleContactIds.filter((id: string) => !alreadySentIds.has(id))

      if (!toSendIds.length) continue

      // Fetch the actual contact records
      const { data: contacts } = await supabase
        .from('contacts')
        .select('*')
        .in('id', toSendIds)

      if (!contacts?.length) continue

      for (const contact of contacts) {
        const ok = await sendCampaignEmail(contact as Contact, step)
        ok ? sent++ : skipped++
        await new Promise((r) => setTimeout(r, 200))
      }
    }

    results[campaign.id] = { sent, skipped }
  }

  return Response.json({ ok: true, results })
}
