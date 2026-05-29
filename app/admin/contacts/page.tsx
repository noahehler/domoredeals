import { getSupabaseClient } from '@/lib/supabase'
import Link from 'next/link'

const STATUS_STYLES: Record<string, { bg: string; color: string }> = {
  new:      { bg: '#f3f4f6', color: '#6b7280' },
  emailed:  { bg: '#eff6ff', color: '#2563eb' },
  opened:   { bg: '#ecfdf5', color: '#059669' },
  clicked:  { bg: '#fefce8', color: '#ca8a04' },
  replied:  { bg: '#f0fdf4', color: '#16a34a' },
  booked:   { bg: '#fdf4ff', color: '#9333ea' },
  client:   { bg: '#fff7ed', color: '#ea580c' },
  unsubscribed: { bg: '#fef2f2', color: '#dc2626' },
}

export default async function ContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; page?: string }>
}) {
  const params = await searchParams
  const statusFilter = params.status
  const page = parseInt(params.page ?? '1', 10)
  const perPage = 50
  const offset = (page - 1) * perPage

  const supabase = getSupabaseClient()

  let query = supabase
    .from('contacts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + perPage - 1)

  if (statusFilter) query = query.eq('status', statusFilter)

  const { data: contacts, count } = await query
  const totalPages = Math.ceil((count ?? 0) / perPage)

  const statuses = ['new', 'emailed', 'opened', 'clicked', 'replied', 'booked', 'client']

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-3xl font-bold"
            style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Contacts
          </h1>
          <p className="text-sm text-gray-500 mt-1">{count ?? 0} total</p>
        </div>
        <Link
          href="/admin/import"
          className="px-4 py-2 rounded-lg text-sm font-semibold"
          style={{ backgroundColor: '#c9a84c', color: '#0f1f3d' }}
        >
          + Import CSV
        </Link>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2 mb-6 flex-wrap">
        <Link
          href="/admin/contacts"
          className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors"
          style={!statusFilter
            ? { backgroundColor: '#0f1f3d', color: '#fff', borderColor: '#0f1f3d' }
            : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }}
        >
          All
        </Link>
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/admin/contacts?status=${s}`}
            className="px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors capitalize"
            style={statusFilter === s
              ? { backgroundColor: '#0f1f3d', color: '#fff', borderColor: '#0f1f3d' }
              : { backgroundColor: '#fff', color: '#6b7280', borderColor: '#e5e7eb' }}
          >
            {s}
          </Link>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
                <th className="px-6 py-3 text-left">Business</th>
                <th className="px-6 py-3 text-left">Email</th>
                <th className="px-6 py-3 text-left">Location</th>
                <th className="px-6 py-3 text-left">Industry</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {(contacts ?? []).map((c) => {
                const style = STATUS_STYLES[c.status] ?? STATUS_STYLES.new
                return (
                  <tr key={c.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium text-gray-800">
                      {c.business_name || '—'}
                      {c.website_url && (
                        <a href={c.website_url} target="_blank" rel="noopener" className="block text-xs text-blue-400 hover:underline truncate max-w-[160px]">
                          {c.website_url.replace(/^https?:\/\//, '')}
                        </a>
                      )}
                    </td>
                    <td className="px-6 py-3 text-gray-600">{c.email}</td>
                    <td className="px-6 py-3 text-gray-500">{c.location || '—'}</td>
                    <td className="px-6 py-3 text-gray-500">{c.industry || '—'}</td>
                    <td className="px-6 py-3">
                      <span
                        className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                        style={style}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-xs text-gray-400">
                      {new Date(c.created_at).toLocaleDateString()}
                    </td>
                  </tr>
                )
              })}
              {!contacts?.length && (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-400">
                    No contacts yet.{' '}
                    <Link href="/admin/import" style={{ color: '#c9a84c' }}>Import a CSV →</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              {page > 1 && (
                <Link
                  href={`/admin/contacts?${statusFilter ? `status=${statusFilter}&` : ''}page=${page - 1}`}
                  className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50"
                >
                  ← Prev
                </Link>
              )}
              {page < totalPages && (
                <Link
                  href={`/admin/contacts?${statusFilter ? `status=${statusFilter}&` : ''}page=${page + 1}`}
                  className="px-3 py-1.5 rounded border border-gray-200 hover:bg-gray-50"
                >
                  Next →
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
