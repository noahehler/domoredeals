import { Resend } from 'resend'
import { getSupabaseClient } from './supabase'

// Types mirroring Supabase tables
export interface Contact {
  id: string
  business_name: string
  website_url: string | null
  email: string
  location: string | null
  industry: string | null
  status: string
}

export interface CampaignEmail {
  id: string
  campaign_id: string
  step: number
  subject: string
  body: string
  delay_days: number
}

// ─── Lazy Resend init ─────────────────────────────────────────────────────────
let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!)
  return _resend
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://domoredeals.com'

// ─── Template interpolation ───────────────────────────────────────────────────
// Body syntax: [CTA:Label:https://url] renders as a tracked button link
function interpolate(text: string, contact: Contact, trackingId: string): string {
  const firstName = (contact.business_name ?? '').split(' ')[0] || 'there'
  const city = contact.location ?? 'your area'
  const industry = contact.industry ?? 'your industry'

  const tracked = (url: string) =>
    `${BASE_URL}/api/track/click?id=${trackingId}&url=${encodeURIComponent(url)}`

  return text
    .replace(/\[Business Name\]/gi, contact.business_name ?? '')
    .replace(/\[first name\]/gi, firstName)
    .replace(/\[city\]/gi, city)
    .replace(/\[industry\]/gi, industry)
    // [CTA:Label:url] → tracked hyperlink
    .replace(/\[CTA:([^:]+):([^\]]+)\]/g, (_, label, url) =>
      `<a href="${tracked(url)}" style="color:#c9a84c;font-weight:600;">${label}</a>`
    )
    // plain [link] fallback
    .replace(/\[link\]/gi, `<a href="${tracked(`${BASE_URL}/#audit`)}" style="color:#c9a84c;font-weight:600;">Get your free audit →</a>`)
    // newlines → <br>
    .replace(/\n/g, '<br>')
}

function buildEmailHtml(contact: Contact, campaignEmail: CampaignEmail, trackingId: string): string {
  const body = interpolate(campaignEmail.body, contact, trackingId)
  const pixelUrl = `${BASE_URL}/api/track/open?id=${trackingId}`

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0">
    <tr><td align="center" style="padding:40px 16px;">
      <table width="580" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
        <!-- Header strip -->
        <tr><td style="background:#0f1f3d;padding:16px 32px;">
          <span style="font-family:Georgia,serif;font-size:18px;font-weight:700;color:#fff;">Do<span style="color:#c9a84c;">More</span>Deals</span>
        </td></tr>
        <!-- Body -->
        <tr><td style="padding:32px;font-size:15px;line-height:1.7;color:#1f2937;">
          ${body}
        </td></tr>
        <!-- Footer -->
        <tr><td style="padding:20px 32px;border-top:1px solid #e5e7eb;font-size:11px;color:#9ca3af;">
          DoMoreDeals · Context SEO for local businesses ·
          <a href="${BASE_URL}/api/track/click?id=${trackingId}&url=${encodeURIComponent(`${BASE_URL}/unsubscribe?id=${trackingId}`)}" style="color:#9ca3af;">Unsubscribe</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
  <img src="${pixelUrl}" width="1" height="1" alt="" style="display:block;border:0;">
</body>
</html>`
}

// ─── Core send function ───────────────────────────────────────────────────────
export async function sendCampaignEmail(
  contact: Contact,
  campaignEmail: CampaignEmail,
): Promise<boolean> {
  const supabase = getSupabaseClient()
  const trackingId = crypto.randomUUID()

  const html = buildEmailHtml(contact, campaignEmail, trackingId)
  const subject = interpolate(campaignEmail.subject, contact, trackingId)

  try {
    const { error } = await getResend().emails.send({
      from: 'Noah at DoMoreDeals <noah@domoredeals.com>',
      to: contact.email,
      subject,
      html,
    })
    if (error) throw error

    await supabase.from('sends').insert({
      contact_id: contact.id,
      campaign_id: campaignEmail.campaign_id,
      step: campaignEmail.step,
      tracking_id: trackingId,
    })

    // Update contact status to 'emailed' if still 'new'
    if (contact.status === 'new') {
      await supabase.from('contacts').update({ status: 'emailed' }).eq('id', contact.id)
    }

    return true
  } catch (err) {
    console.error(`[email-sender] failed for ${contact.email}:`, err)
    return false
  }
}
