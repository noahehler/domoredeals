import { Resend } from 'resend'
import type { AuditData } from './audit-agent'

let _resend: Resend | null = null
function getResend() {
  if (!_resend) _resend = new Resend(process.env.RESEND_API_KEY!)
  return _resend
}

const NAVY = '#0f1f3d'
const GOLD = '#c9a84c'
const LIGHT_GOLD = '#e8c96e'
const RED = '#e53e3e'
const GREEN = '#38a169'
const ORANGE = '#d97706'
const DARK_CARD = '#162847'
const BORDER = '#1e3a6e'

function presenceStatusBadge(status: string): string {
  const cfg: Record<string, { bg: string; color: string }> = {
    ACTIVE: { bg: '#064e3b', color: '#6ee7b7' },
    VERIFIED: { bg: '#064e3b', color: '#6ee7b7' },
    PRESENT: { bg: '#064e3b', color: '#6ee7b7' },
    UNVERIFIED: { bg: '#7c2d12', color: '#fdba74' },
    UNCLAIMED: { bg: '#7c2d12', color: '#fdba74' },
    MISSING: { bg: '#450a0a', color: '#fca5a5' },
    NONE: { bg: '#1e293b', color: '#94a3b8' },
    INACTIVE: { bg: '#1e293b', color: '#94a3b8' },
  }
  const s = cfg[status] ?? { bg: '#1e293b', color: '#94a3b8' }
  return `<span style="background:${s.bg};color:${s.color};padding:2px 8px;border-radius:4px;font-size:11px;font-weight:700;letter-spacing:0.05em;">${status}</span>`
}

function priorityBadge(p: string): string {
  const colors: Record<string, string> = { HIGH: RED, MED: ORANGE, LOW: GREEN }
  return `<span style="color:${colors[p] ?? '#999'};font-weight:700;font-size:12px;">${p}</span>`
}

function existsBadge(e: string): string {
  const colors: Record<string, string> = { YES: GREEN, PARTIAL: ORANGE, NO: RED }
  return `<span style="color:${colors[e] ?? '#999'};font-weight:700;font-size:12px;">${e}</span>`
}

function buildHtml(
  businessName: string,
  websiteUrl: string,
  audit: AuditData
): string {
  const scoreColor = audit.visibilityScore < 30 ? RED : audit.visibilityScore < 60 ? ORANGE : GREEN
  const today = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  const queryRows = audit.queries
    .map(
      (q) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};color:#cbd5e1;font-size:13px;">
        "${q.query}"
      </td>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};text-align:right;white-space:nowrap;">
        ${q.found
          ? `<span style="color:${GREEN};font-weight:700;font-size:13px;">Found ✓</span>`
          : `<span style="color:${RED};font-size:13px;">Not found</span>`
        }
      </td>
    </tr>`
    )
    .join('')

  const presenceItems = [
    {
      icon: '🌐',
      label: 'Website',
      info: audit.digitalPresence.website,
      detail: audit.digitalPresence.website.notes,
    },
    {
      icon: '📘',
      label: 'Facebook',
      info: audit.digitalPresence.facebook,
      detail: audit.digitalPresence.facebook.handle ?? audit.digitalPresence.facebook.notes ?? '',
    },
    {
      icon: '📸',
      label: 'Instagram',
      info: audit.digitalPresence.instagram,
      detail: audit.digitalPresence.instagram.handle ?? audit.digitalPresence.instagram.notes ?? '',
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      info: audit.digitalPresence.linkedin,
      detail: audit.digitalPresence.linkedin.notes ?? '',
    },
    {
      icon: '🗺',
      label: 'Bing Places',
      info: audit.digitalPresence.bingPlaces,
      detail: audit.digitalPresence.bingPlaces.notes,
    },
    {
      icon: '🍎',
      label: 'Apple Maps',
      info: audit.digitalPresence.appleMaps,
      detail: audit.digitalPresence.appleMaps.notes,
    },
    {
      icon: '🏷',
      label: 'Schema Markup',
      info: audit.digitalPresence.schemaMarkup,
      detail: audit.digitalPresence.schemaMarkup.notes,
    },
    {
      icon: '❓',
      label: 'FAQ Page',
      info: audit.digitalPresence.faqPage,
      detail: audit.digitalPresence.faqPage.notes,
    },
  ]

  const presenceRows = presenceItems
    .map(
      (item) => `
    <tr>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};">
        <span style="font-size:16px;">${item.icon}</span>
        <span style="color:#cbd5e1;font-size:13px;margin-left:8px;">${item.label}</span>
      </td>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};text-align:center;">
        ${presenceStatusBadge(item.info.status)}
      </td>
      <td style="padding:8px 0;border-bottom:1px solid ${BORDER};color:#94a3b8;font-size:11px;text-align:right;">
        ${item.detail ?? ''}
      </td>
    </tr>`
    )
    .join('')

  const workingItems = audit.whatIsWorking
    .map(
      (s) =>
        `<tr><td style="padding:6px 0;color:#cbd5e1;font-size:13px;">✓ ${s}</td></tr>`
    )
    .join('')

  const matrixRows = audit.contextMatrix
    .map(
      (row) => `
    <tr>
      <td style="padding:10px 8px;border-bottom:1px solid ${BORDER};color:#cbd5e1;font-size:12px;">${row.customerType}</td>
      <td style="padding:10px 8px;border-bottom:1px solid ${BORDER};color:#94a3b8;font-size:12px;">"${row.aiQuery}"</td>
      <td style="padding:10px 8px;border-bottom:1px solid ${BORDER};color:#cbd5e1;font-size:12px;">${row.contentNeeded}</td>
      <td style="padding:10px 8px;border-bottom:1px solid ${BORDER};text-align:center;">${existsBadge(row.exists)}</td>
      <td style="padding:10px 8px;border-bottom:1px solid ${BORDER};text-align:center;">${priorityBadge(row.priority)}</td>
    </tr>`
    )
    .join('')

  const actionCards = audit.topActions
    .map(
      (action, i) => `
    <td style="width:33%;padding:0 8px;vertical-align:top;">
      <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${DARK_CARD};border-radius:8px;border:1px solid ${BORDER};">
        <tr>
          <td style="padding:20px;">
            <div style="background:${GOLD};color:${NAVY};width:28px;height:28px;border-radius:50%;text-align:center;line-height:28px;font-weight:900;font-size:14px;margin-bottom:12px;">${i + 1}</div>
            <div style="color:#f1f5f9;font-weight:700;font-size:15px;margin-bottom:10px;">${action.title}</div>
            <div style="color:#94a3b8;font-size:12px;line-height:1.6;margin-bottom:14px;">${action.description}</div>
            <div style="color:${LIGHT_GOLD};font-size:12px;font-weight:600;">${action.impact}</div>
          </td>
        </tr>
      </table>
    </td>`
    )
    .join('')

  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AI Visibility Audit — ${businessName}</title></head>
<body style="margin:0;padding:0;background:#0a1628;font-family:'Helvetica Neue',Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#0a1628;">
  <tr><td align="center" style="padding:32px 16px;">
    <table width="680" cellpadding="0" cellspacing="0" border="0" style="max-width:680px;width:100%;">

      <!-- HEADER -->
      <tr>
        <td style="background:${NAVY};padding:24px 32px;border-radius:12px 12px 0 0;border-bottom:2px solid ${GOLD};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td>
                <div style="color:${GOLD};font-size:22px;font-weight:900;letter-spacing:-0.5px;">DoMore<span style="color:#fff;">Deals</span></div>
                <div style="color:#64748b;font-size:10px;letter-spacing:0.15em;margin-top:2px;">CONTEXT SEO™ · AI VISIBILITY AUDIT</div>
              </td>
              <td style="text-align:right;">
                <div style="color:#f1f5f9;font-size:14px;font-weight:700;">AI Visibility Audit Report</div>
                <div style="color:${GOLD};font-size:13px;font-weight:600;margin-top:2px;">${businessName}</div>
                <div style="color:#64748b;font-size:11px;margin-top:2px;">${websiteUrl} · ${today} · Confidential</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- STATS ROW -->
      <tr>
        <td style="background:${DARK_CARD};padding:24px 32px;border-bottom:1px solid ${BORDER};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="text-align:center;padding:0 8px;">
                <div style="color:${scoreColor};font-size:48px;font-weight:900;line-height:1;">${audit.visibilityScore}</div>
                <div style="color:#94a3b8;font-size:10px;letter-spacing:0.1em;margin-top:4px;">VISIBILITY SCORE</div>
                <div style="color:#64748b;font-size:10px;">out of 100</div>
              </td>
              <td style="text-align:center;padding:0 8px;border-left:1px solid ${BORDER};">
                <div style="font-size:22px;margin-bottom:4px;">🔍</div>
                <div style="color:#f1f5f9;font-size:18px;font-weight:700;">${audit.queriesTested}</div>
                <div style="color:#94a3b8;font-size:10px;letter-spacing:0.1em;">AI QUERIES TESTED</div>
                <div style="color:#64748b;font-size:10px;">Across ChatGPT, Claude &amp; Perplexity</div>
              </td>
              <td style="text-align:center;padding:0 8px;border-left:1px solid ${BORDER};">
                <div style="font-size:22px;margin-bottom:4px;">❌</div>
                <div style="color:${RED};font-size:18px;font-weight:700;">${audit.queriesFound} of ${audit.queriesTested}</div>
                <div style="color:#94a3b8;font-size:10px;letter-spacing:0.1em;">QUERIES APPEARED IN</div>
                <div style="color:#64748b;font-size:10px;">${audit.queriesFound <= 1 ? 'Only brand-name direct searches' : 'Partial AI visibility'}</div>
              </td>
              <td style="text-align:center;padding:0 8px;border-left:1px solid ${BORDER};">
                <div style="font-size:22px;margin-bottom:4px;">🏆</div>
                <div style="color:${GOLD};font-size:18px;font-weight:700;">${audit.contextGapsFound} of ${audit.contextMatrix.length}</div>
                <div style="color:#94a3b8;font-size:10px;letter-spacing:0.1em;">CONTEXT GAPS FOUND</div>
                <div style="color:#64748b;font-size:10px;">Customer types with no content</div>
              </td>
              <td style="text-align:center;padding:0 8px;border-left:1px solid ${BORDER};">
                <div style="font-size:22px;margin-bottom:4px;">📅</div>
                <div style="color:${GOLD};font-size:18px;font-weight:700;">${audit.estimatedTimeToFix}</div>
                <div style="color:#94a3b8;font-size:10px;letter-spacing:0.1em;">EST. TIME TO FIX</div>
                <div style="color:#64748b;font-size:10px;">To 75%+ AI visibility</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- BUSINESS BANNER -->
      <tr>
        <td style="background:${NAVY};padding:24px 32px;border:1px solid ${BORDER};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="width:80px;text-align:center;vertical-align:top;">
                ${audit.yearsInBusiness ? `<div style="color:${GOLD};font-size:28px;font-weight:900;line-height:1;">${audit.yearsInBusiness}+</div><div style="color:#64748b;font-size:10px;letter-spacing:0.1em;">YEARS IN<br>BUSINESS</div>` : ''}
              </td>
              <td style="padding-left:20px;border-left:${audit.yearsInBusiness ? `1px solid ${BORDER}` : 'none'};">
                <div style="color:#f1f5f9;font-size:15px;font-weight:700;margin-bottom:8px;">${audit.narrativeSummary.split('.')[0]}.</div>
                <div style="color:#94a3b8;font-size:13px;line-height:1.6;">${audit.narrativeSummary.split('.').slice(1).join('.').trim()}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- TWO COLUMN: QUERIES + DIGITAL PRESENCE -->
      <tr>
        <td style="background:${DARK_CARD};padding:24px 32px;border-bottom:1px solid ${BORDER};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr valign="top">
              <!-- Queries column -->
              <td style="width:48%;padding-right:20px;border-right:1px solid ${BORDER};">
                <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:0.15em;margin-bottom:16px;">AI QUERY RESULTS — BASELINE</div>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${queryRows}
                </table>
              </td>
              <!-- Digital presence column -->
              <td style="width:52%;padding-left:20px;">
                <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:0.15em;margin-bottom:16px;">CURRENT DIGITAL PRESENCE</div>
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  ${presenceRows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>

      <!-- WHAT'S WORKING -->
      <tr>
        <td style="background:${NAVY};padding:20px 32px;border-bottom:1px solid ${BORDER};">
          <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:0.15em;margin-bottom:12px;">WHAT'S WORKING — KEEP &amp; BUILD ON</div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            ${workingItems}
          </table>
        </td>
      </tr>

      <!-- CONTEXT MATRIX -->
      <tr>
        <td style="background:${DARK_CARD};padding:24px 32px;border-bottom:1px solid ${BORDER};">
          <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:0.15em;margin-bottom:16px;">CUSTOMER CONTEXT MATRIX — WHERE AI OPPORTUNITIES ARE BEING MISSED</div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr style="background:${NAVY};">
              <th style="padding:8px;text-align:left;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.05em;">CUSTOMER TYPE</th>
              <th style="padding:8px;text-align:left;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.05em;">WHAT THEY ASK AI</th>
              <th style="padding:8px;text-align:left;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.05em;">CONTENT NEEDED TO WIN</th>
              <th style="padding:8px;text-align:center;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.05em;">EXISTS?</th>
              <th style="padding:8px;text-align:center;color:#94a3b8;font-size:11px;font-weight:600;letter-spacing:0.05em;">PRIORITY</th>
            </tr>
            ${matrixRows}
          </table>
        </td>
      </tr>

      <!-- TOP 3 ACTIONS -->
      <tr>
        <td style="background:${NAVY};padding:24px 32px;border-bottom:1px solid ${BORDER};">
          <div style="color:${GOLD};font-size:11px;font-weight:700;letter-spacing:0.15em;margin-bottom:20px;">TOP 3 HIGHEST-IMPACT ACTIONS — MONTH 1</div>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr valign="top">
              ${actionCards}
            </tr>
          </table>
        </td>
      </tr>

      <!-- FOOTER -->
      <tr>
        <td style="background:${DARK_CARD};padding:20px 32px;border-radius:0 0 12px 12px;border-top:1px solid ${BORDER};">
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td style="color:#64748b;font-size:11px;">
                Prepared by DoMoreDeals · This audit is complimentary and confidential · Questions? <a href="https://domoredeals.com" style="color:${GOLD};text-decoration:none;">domoredeals.com</a>
              </td>
              <td style="text-align:right;">
                <div style="color:${GOLD};font-size:14px;font-weight:900;">DoMore<span style="color:#fff;">Deals</span></div>
                <div style="color:#64748b;font-size:9px;letter-spacing:0.1em;">Be the answer, not the option.</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>

    </table>
  </td></tr>
</table>
</body>
</html>`
}

export async function sendAuditEmail(
  to: string,
  businessName: string,
  websiteUrl: string,
  audit: AuditData
): Promise<void> {
  await getResend().emails.send({
    from: 'DoMoreDeals <audits@domoredeals.com>',
    to,
    subject: `Your AI Visibility Audit — ${businessName} (Score: ${audit.visibilityScore}/100)`,
    html: buildHtml(businessName, websiteUrl, audit),
  })
}
