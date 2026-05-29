import { getSupabaseClient } from '@/lib/supabase'

function StatCard({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
      <p
        className="text-4xl font-bold"
        style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        {value}
      </p>
      {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
    </div>
  )
}

function pct(num: number, denom: number) {
  if (!denom) return '—'
  return `${Math.round((num / denom) * 100)}%`
}

export default async function AdminDashboard() {
  const supabase = getSupabaseClient()
  const today = new Date(); today.setHours(0, 0, 0, 0)

  const [
    { count: sendsTodayCount },
    { count: totalSends },
    { count: totalOpened },
    { count: totalClicked },
    { count: totalLeads },
    { count: totalContacts },
  ] = await Promise.all([
    supabase.from('sends').select('id', { count: 'exact', head: true }).gte('sent_at', today.toISOString()),
    supabase.from('sends').select('id', { count: 'exact', head: true }),
    supabase.from('sends').select('id', { count: 'exact', head: true }).not('opened_at', 'is', null),
    supabase.from('sends').select('id', { count: 'exact', head: true }).not('clicked_at', 'is', null),
    supabase.from('leads').select('id', { count: 'exact', head: true }),
    supabase.from('contacts').select('id', { count: 'exact', head: true }),
  ])

  // Recent sends
  const { data: recentSends } = await supabase
    .from('sends')
    .select('id, sent_at, step, opened_at, clicked_at, contacts(business_name, email, location)')
    .order('sent_at', { ascending: false })
    .limit(8)

  return (
    <div>
      <h1
        className="text-3xl font-bold mb-1"
        style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Dashboard
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </p>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard label="Sent Today"      value={sendsTodayCount ?? 0} />
        <StatCard label="Total Sent"      value={totalSends ?? 0} />
        <StatCard label="Open Rate"       value={pct(totalOpened ?? 0, totalSends ?? 0)} sub={`${totalOpened ?? 0} opens`} />
        <StatCard label="Click Rate"      value={pct(totalClicked ?? 0, totalSends ?? 0)} sub={`${totalClicked ?? 0} clicks`} />
        <StatCard label="Audits Completed" value={totalLeads ?? 0} sub="from website form" />
        <StatCard label="Total Contacts"  value={totalContacts ?? 0} sub="in outreach list" />
      </div>

      {/* Recent sends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Recent Sends</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Business</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Step</th>
                <th className="px-6 py-3 text-left">Sent</th>
                <th className="px-6 py-3 text-left">Opened</th>
                <th className="px-6 py-3 text-left">Clicked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(recentSends ?? []).map((row: Record<string, unknown>) => {
                const contact = row.contacts as Record<string, string> | null
                return (
                  <tr key={row.id as string} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-800">{contact?.business_name ?? '—'}</td>
                    <td className="px-6 py-3 text-gray-500">{contact?.email ?? '—'}</td>
                    <td className="px-6 py-3">
                      <span
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{ background: '#e8f4fd', color: '#0f1f3d' }}
                      >
                        Step {row.step as number}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-400 text-xs">
                      {new Date(row.sent_at as string).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-3">
                      {row.opened_at ? <span style={{ color: '#16a34a' }}>✓</span> : <span className="text-gray-300">—</span>}
                    </td>
                    <td className="px-6 py-3">
                      {row.clicked_at ? <span style={{ color: '#c9a84c' }}>✓</span> : <span className="text-gray-300">—</span>}
                    </td>
                  </tr>
                )
              })}
              {!recentSends?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-10 text-center text-gray-400">
                    No sends yet. Import contacts and activate a campaign.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
