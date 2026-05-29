import { getSupabaseClient } from '@/lib/supabase'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const trackingId = searchParams.get('id')
  const destination = searchParams.get('url') ?? 'https://domoredeals.com'

  if (trackingId) {
    const supabase = getSupabaseClient()
    // Log the click then update contact status
    supabase
      .from('sends')
      .update({ clicked_at: new Date().toISOString() })
      .eq('tracking_id', trackingId)
      .is('clicked_at', null)
      .then(async () => {
        const { data } = await supabase
          .from('sends')
          .select('contact_id')
          .eq('tracking_id', trackingId)
          .single()
        if (data?.contact_id) {
          await supabase
            .from('contacts')
            .update({ status: 'clicked' })
            .eq('id', data.contact_id)
        }
      })
  }

  // Immediately redirect the user
  return Response.redirect(destination, 302)
}
