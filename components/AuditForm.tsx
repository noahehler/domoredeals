'use client'

import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function AuditForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const [form, setForm] = useState({
    businessName: '',
    websiteUrl: '',
    location: '',
    email: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (!res.ok) {
        setErrorMsg(data.error ?? 'Something went wrong. Please try again.')
        setStatus('error')
      } else {
        setStatus('success')
      }
    } catch {
      setErrorMsg('Network error. Please try again.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section id="audit" className="py-24 px-6" style={{ background: '#0a1628' }}>
        <div className="max-w-xl mx-auto text-center">
          <div className="text-5xl mb-6">📬</div>
          <h2 className="text-3xl font-bold text-white mb-4">Your audit is running.</h2>
          <p className="text-slate-400 text-lg leading-relaxed mb-6">
            Our AI agent is analyzing your website and testing your visibility across ChatGPT,
            Claude, and Perplexity. You&apos;ll receive your full report in{' '}
            <span style={{ color: '#c9a84c' }} className="font-semibold">under 2 minutes</span>.
          </p>
          <p className="text-slate-500 text-sm">Check your inbox — and your spam folder just in case.</p>
        </div>
      </section>
    )
  }

  return (
    <section id="audit" className="py-24 px-6" style={{ background: '#0a1628' }}>
      <div className="max-w-2xl mx-auto">
        {/* Eyebrow */}
        <p
          className="text-center text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: '#c9a84c' }}
        >
          Free — No Credit Card — Delivered in 2 Minutes
        </p>

        {/* Headline */}
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-4 leading-tight">
          Get Your Free{' '}
          <span style={{ color: '#c9a84c' }}>AI Visibility Audit</span>
        </h2>
        <p className="text-slate-400 text-center text-lg mb-10 leading-relaxed">
          See exactly how visible your business is on ChatGPT, Claude, and Perplexity — and
          the three highest-impact fixes to show up first.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl p-8 md:p-10 space-y-5"
          style={{ background: '#162847', border: '1px solid #1e3a6e' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Business Name
              </label>
              <input
                name="businessName"
                type="text"
                required
                placeholder="Acme Roofing Co."
                value={form.businessName}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition"
                style={{ background: '#0f1f3d', border: '1px solid #1e3a6e' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Website URL
              </label>
              <input
                name="websiteUrl"
                type="url"
                required
                placeholder="https://yoursite.com"
                value={form.websiteUrl}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition"
                style={{ background: '#0f1f3d', border: '1px solid #1e3a6e' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                City / Market
              </label>
              <input
                name="location"
                type="text"
                required
                placeholder="San Antonio, TX"
                value={form.location}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition"
                style={{ background: '#0f1f3d', border: '1px solid #1e3a6e' }}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="you@yourcompany.com"
                value={form.email}
                onChange={handleChange}
                disabled={status === 'loading'}
                className="w-full rounded-lg px-4 py-3 text-white placeholder-slate-500 text-sm focus:outline-none transition"
                style={{ background: '#0f1f3d', border: '1px solid #1e3a6e' }}
              />
            </div>
          </div>

          {status === 'error' && (
            <p className="text-red-400 text-sm text-center">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-4 rounded-xl text-base font-bold tracking-wide transition-all"
            style={{
              background: status === 'loading' ? '#8a6f2e' : '#c9a84c',
              color: '#0f1f3d',
              cursor: status === 'loading' ? 'not-allowed' : 'pointer',
            }}
          >
            {status === 'loading' ? 'Running Your Audit…' : 'Get My Free AI Visibility Audit →'}
          </button>

          <p className="text-slate-500 text-xs text-center">
            Your audit includes 10 AI query tests, a full digital presence review, and your top 3
            fixes — free, no strings attached.
          </p>
        </form>

        {/* Social proof */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-500">
          <span>✓ Delivered in under 2 minutes</span>
          <span>✓ No credit card required</span>
          <span>✓ 100% confidential</span>
        </div>
      </div>
    </section>
  )
}
