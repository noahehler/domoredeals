import { getSupabaseClient } from '@/lib/supabase'

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  draft:  { bg: '#f3f4f6', color: '#6b7280' },
  active: { bg: '#ecfdf5', color: '#059669' },
  paused: { bg: '#fef9c3', color: '#ca8a04' },
}

export default async function CampaignsPage() {
  const supabase = getSupabaseClient()

  const { data: campaigns } = await supabase
    .from('campaigns')
    .select('*')
    .order('created_at', { ascending: false })

  // For each campaign, get send stats
  const stats = await Promise.all(
    (campaigns ?? []).map(async (c) => {
      const [{ count: totalSends }, { count: opens }, { count: clicks }] = await Promise.all([
        supabase.from('sends').select('id', { count: 'exact', head: true }).eq('campaign_id', c.id),
        supabase.from('sends').select('id', { count: 'exact', head: true }).eq('campaign_id', c.id).not('opened_at', 'is', null),
        supabase.from('sends').select('id', { count: 'exact', head: true }).eq('campaign_id', c.id).not('clicked_at', 'is', null),
      ])
      return { id: c.id, totalSends, opens, clicks }
    })
  )

  const statsMap = Object.fromEntries(stats.map((s) => [s.id, s]))

  // Get email steps for each campaign
  const { data: allSteps } = await supabase
    .from('campaign_emails')
    .select('*')
    .order('step', { ascending: true })

  const stepsByCampaign: Record<string, typeof allSteps> = {}
  for (const step of allSteps ?? []) {
    if (!stepsByCampaign[step.campaign_id]) stepsByCampaign[step.campaign_id] = []
    stepsByCampaign[step.campaign_id]!.push(step)
  }

  function pct(n: number | null, d: number | null) {
    if (!d) return '—'
    return `${Math.round(((n ?? 0) / d) * 100)}%`
  }

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-6"
        style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Campaigns
      </h1>

      <div className="space-y-6">
        {(campaigns ?? []).map((campaign) => {
          const s = statsMap[campaign.id]
          const style = STATUS_STYLE[campaign.status] ?? STATUS_STYLE.draft
          const steps = stepsByCampaign[campaign.id] ?? []

          return (
            <div key={campaign.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Campaign header */}
              <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-3">
                    <h2 className="font-semibold text-gray-900 text-lg">{campaign.name}</h2>
                    <span
                      className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                      style={style}
                    >
                      {campaign.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Daily limit: {campaign.daily_limit} · Created {new Date(campaign.created_at).toLocaleDateString()}
                  </p>
                </div>
                {/* Stats pills */}
                <div className="flex gap-4 text-center">
                  {[
                    { label: 'Sent',    value: s?.totalSends ?? 0 },
                    { label: 'Open %',  value: pct(s?.opens ?? null, s?.totalSends ?? null) },
                    { label: 'Click %', value: pct(s?.clicks ?? null, s?.totalSends ?? null) },
                  ].map((stat) => (
                    <div key={stat.label}>
                      <div
                        className="text-xl font-bold"
                        style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
                      >
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Email sequence */}
              <div className="px-6 py-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                  Email Sequence ({steps.length} steps)
                </p>
                <div className="space-y-3">
                  {steps.map((step, idx) => (
                    <div key={step.id} className="flex gap-4 items-start">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                        style={{ backgroundColor: '#0f1f3d', color: '#c9a84c' }}
                      >
                        {step.step}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800">{step.subject}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {idx === 0 ? 'Send immediately' : `Send ${step.delay_days} day${step.delay_days !== 1 ? 's' : ''} after step ${step.step - 1} (if no click)`}
                        </p>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">
                          {step.body.replace(/\[CTA:[^\]]+\]/g, '[link]').slice(0, 120)}…
                        </p>
                      </div>
                    </div>
                  ))}
                  {!steps.length && (
                    <p className="text-sm text-gray-400">No email steps defined yet.</p>
                  )}
                </div>
              </div>
            </div>
          )
        })}

        {!campaigns?.length && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center text-gray-400">
            No campaigns yet. Run the schema.sql in Supabase to seed the first campaign.
          </div>
        )}
      </div>
    </div>
  )
}
