import Anthropic from '@anthropic-ai/sdk'
import { getSupabaseClient } from './supabase'
import { sendAuditEmail } from './email'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })

export interface Lead {
  id: string
  email: string
  business_name: string
  website_url: string
  location: string
}

export interface AuditData {
  visibilityScore: number
  yearsInBusiness: string | null
  narrativeSummary: string
  estimatedTimeToFix: string
  queriesTested: number
  queriesFound: number
  contextGapsFound: number
  queries: Array<{ query: string; found: boolean; reason: string }>
  digitalPresence: {
    website: { status: string; notes: string }
    facebook: { status: string; handle?: string | null; notes?: string | null }
    instagram: { status: string; handle?: string | null; notes?: string | null }
    linkedin: { status: string; notes?: string | null }
    bingPlaces: { status: string; notes: string }
    appleMaps: { status: string; notes: string }
    schemaMarkup: { status: string; notes: string }
    faqPage: { status: string; notes: string }
  }
  whatIsWorking: string[]
  contextMatrix: Array<{
    customerType: string
    aiQuery: string
    contentNeeded: string
    exists: 'YES' | 'PARTIAL' | 'NO'
    priority: 'HIGH' | 'MED' | 'LOW'
  }>
  topActions: Array<{ title: string; description: string; impact: string }>
}

async function fetchWebsiteContent(url: string): Promise<string> {
  try {
    const normalized = url.startsWith('http') ? url : `https://${url}`
    const res = await fetch(normalized, {
      headers: { 'User-Agent': 'Mozilla/5.0 (compatible; DoMoreDeals-AuditBot/1.0)' },
      signal: AbortSignal.timeout(15000),
    })
    const html = await res.text()
    return html
      .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
      .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 8000)
  } catch {
    return ''
  }
}

export async function runAuditAgent(lead: Lead): Promise<void> {
  const supabase = getSupabaseClient()

  try {
    await supabase.from('leads').update({ status: 'processing' }).eq('id', lead.id)

    const websiteContent = await fetchWebsiteContent(lead.website_url)

    const response = await anthropic.messages.create({
      model: 'claude-sonnet-4-6',
      max_tokens: 4096,
      system: `You are an expert Context SEO analyst specializing in AI visibility audits for local businesses.
You help businesses understand why they're invisible to AI platforms (ChatGPT, Claude, Perplexity) and what to fix.
Always respond with a single valid JSON object and nothing else.`,
      messages: [
        {
          role: 'user',
          content: `Generate a complete AI visibility audit for this business.

Business Name: ${lead.business_name}
Location: ${lead.location}
Website: ${lead.website_url}
Website Content (extracted text): ${websiteContent || 'Could not fetch — treat as minimal online presence'}

Return exactly this JSON structure with no markdown, no explanation, just the JSON:

{
  "visibilityScore": <integer 0-100. Most small local businesses score 5-25. Only score higher if the website content shows strong AI-ready signals like schema, FAQs, detailed service pages>,
  "yearsInBusiness": <string like "12" or "50+" if found in content, else null>,
  "narrativeSummary": "<2-3 sentences: acknowledge their business/reputation, explain why AI doesn't know them yet, frame this as a fixable competitive opportunity>",
  "estimatedTimeToFix": "90 Days",
  "queries": [
    <exactly 10 objects. Each: { "query": "<realistic natural-language query a customer would ask ChatGPT/Claude for this business type and location>", "found": <true ONLY if the business appears prominently in your training data for this query; default false for generic queries about small local businesses>, "reason": "<one short sentence why found or not found>" }>
    Ensure mix: ~8-9 generic category queries (not found), 1 brand-name direct search (found)
  ],
  "digitalPresence": {
    "website": { "status": "ACTIVE", "notes": "<brief note about site quality/platform if detectable>" },
    "facebook": { "status": "<ACTIVE|NONE>", "handle": "<handle string or null>" },
    "instagram": { "status": "<ACTIVE|NONE>", "handle": "<handle string or null>" },
    "linkedin": { "status": "<ACTIVE|NONE>", "notes": "<note or null>" },
    "bingPlaces": { "status": "<VERIFIED|UNVERIFIED|UNCLAIMED>", "notes": "<ChatGPT uses Bing — explain impact>" },
    "appleMaps": { "status": "<ACTIVE|UNCLAIMED>", "notes": "<Siri uses Apple Maps — explain impact>" },
    "schemaMarkup": { "status": "<PRESENT|MISSING>", "notes": "<note about what's missing or present>" },
    "faqPage": { "status": "<PRESENT|MISSING>", "notes": "<note about AI impact of FAQ pages>" }
  },
  "whatIsWorking": ["<strength 1>", "<strength 2>", "<strength 3>"],
  "contextMatrix": [
    <7-8 objects. Each: { "customerType": "<persona>", "aiQuery": "<exact query they'd ask AI>", "contentNeeded": "<specific page or content type needed to win>", "exists": "<YES|PARTIAL|NO>", "priority": "<HIGH|MED|LOW>" }>
  ],
  "topActions": [
    <exactly 3 objects ordered by impact. Each: { "title": "<short action name>", "description": "<2-3 sentences: what to do and why it matters for AI visibility>", "impact": "<e.g. '↑ Estimated +3-4 queries within 30 days'>" }>
  ]
}`,
        },
      ],
    })

    const content = response.content[0]
    if (content.type !== 'text') throw new Error('Unexpected Claude response type')

    const jsonMatch = content.text.match(/\{[\s\S]*\}/)
    if (!jsonMatch) throw new Error('No JSON found in Claude response')

    const raw = JSON.parse(jsonMatch[0])
    const auditData: AuditData = {
      ...raw,
      queriesTested: raw.queries?.length ?? 10,
      queriesFound: (raw.queries ?? []).filter((q: { found: boolean }) => q.found).length,
      contextGapsFound: (raw.contextMatrix ?? []).filter(
        (r: { exists: string }) => r.exists !== 'YES'
      ).length,
    }

    await supabase.from('audits').insert({
      lead_id: lead.id,
      visibility_score: auditData.visibilityScore,
      queries_tested: auditData.queriesTested,
      queries_found: auditData.queriesFound,
      gaps_found: auditData.contextGapsFound,
      audit_data: auditData,
    })

    await sendAuditEmail(lead.email, lead.business_name, lead.website_url, auditData)

    await supabase.from('leads').update({ status: 'completed' }).eq('id', lead.id)
  } catch (error) {
    await supabase.from('leads').update({ status: 'failed' }).eq('id', lead.id)
    console.error('[audit-agent] error:', error)
    throw error
  }
}
