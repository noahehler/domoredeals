import { getSupabaseClient } from '@/lib/supabase'

// Smallest valid 1×1 transparent GIF
const PIXEL = Buffer.from(
  'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
  'base64'
)

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingId = searchParams.get('id')

  if (trackingId) {
    const supabase = getSupabaseClient()
    // Fire-and-forget — don't await so the pixel returns immediately
    supabase
      .from('sends')
      .update({ opened_at: new Date().toISOString() })
      .eq('tracking_id', trackingId)
      .is('opened_at', null)          // only set once
      .then(async () => {
        // Also bump contact status to 'opened' if currently 'emailed'
        const { data } = await supabase
          .from('sends')
          .select('contact_id')
          .eq('tracking_id', trackingId)
          .single()
        if (data?.contact_id) {
          await supabase
            .from('contacts')
            .update({ status: 'opened' })
            .eq('id', data.contact_id)
            .eq('status', 'emailed')
        }
      })
  }

  return new Response(PIXEL, {
    headers: {
      'Content-Type': 'image/gif',
      'Cache-Control': 'no-store, no-cache, must-revalidate, max-age=0',
    },
  })
}
