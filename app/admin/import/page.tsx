'use client'

import { useState, useRef } from 'react'

const EXPECTED_HEADERS = ['business_name', 'website_url', 'email', 'location', 'industry', 'cms']

interface ParsedRow { business_name: string; website_url: string; email: string; location: string; industry: string; cms: string }

function parseCsvPreview(text: string): ParsedRow[] {
  const lines = text.replace(/\r\n/g, '\n').trim().split('\n')
  if (lines.length < 2) return []
  const headers = lines[0].split(',').map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'))
  return lines.slice(1, 6).map((line) => {
    const vals = line.split(',').map((v) => v.trim().replace(/^"|"$/g, ''))
    const row: Record<string, string> = {}
    headers.forEach((h, i) => { row[h] = vals[i] ?? '' })
    return {
      business_name: row.business_name || row.name || '',
      website_url: row.website_url || row.website || '',
      email: row.email || '',
      location: row.location || row.city || '',
      industry: row.industry || row.category || '',
      cms: row.cms || '',
    }
  })
}

export default function ImportPage() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<ParsedRow[]>([])
  const [status, setStatus] = useState<'idle' | 'uploading' | 'done' | 'error'>('idle')
  const [result, setResult] = useState<{ imported?: number; parsed?: number; error?: string } | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  async function handleFile(f: File) {
    setFile(f)
    const text = await f.text()
    setPreview(parseCsvPreview(text))
    setStatus('idle')
    setResult(null)
  }

  async function handleUpload() {
    if (!file) return
    setStatus('uploading')
    const form = new FormData()
    form.append('file', file)
    try {
      const res = await fetch('/api/contacts/import', { method: 'POST', body: form })
      const json = await res.json()
      setResult(json)
      setStatus(res.ok ? 'done' : 'error')
    } catch {
      setResult({ error: 'Network error.' })
      setStatus('error')
    }
  }

  return (
    <div className="max-w-2xl">
      <h1
        className="text-3xl font-bold mb-2"
        style={{ color: '#0f1f3d', fontFamily: "'Playfair Display', Georgia, serif" }}
      >
        Import Contacts
      </h1>
      <p className="text-sm text-gray-500 mb-8">
        Upload a CSV with columns: <code className="bg-gray-100 px-1 rounded text-xs">{EXPECTED_HEADERS.join(', ')}</code>.
        Duplicates (by email) are skipped automatically.
      </p>

      {/* Drop zone */}
      <div
        className="border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer hover:bg-gray-50 transition-colors mb-6"
        style={{ borderColor: file ? '#c9a84c' : '#d1d5db' }}
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) handleFile(f) }}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".csv,text/csv"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f) }}
        />
        {file ? (
          <div>
            <p className="text-2xl mb-1">📄</p>
            <p className="font-semibold text-gray-800">{file.name}</p>
            <p className="text-xs text-gray-400 mt-1">{(file.size / 1024).toFixed(1)} KB · Click to change</p>
          </div>
        ) : (
          <div>
            <p className="text-4xl mb-3">↑</p>
            <p className="font-semibold text-gray-700">Click or drag CSV here</p>
            <p className="text-sm text-gray-400 mt-1">business_name, email, location, industry…</p>
          </div>
        )}
      </div>

      {/* Preview */}
      {preview.length > 0 && (
        <div className="bg-white rounded-xl border border-gray-100 overflow-hidden mb-6">
          <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">
              Preview (first 5 rows)
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400 border-b border-gray-100">
                  {['Business', 'Email', 'Location', 'Industry'].map((h) => (
                    <th key={h} className="px-4 py-2 text-left">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {preview.map((row, i) => (
                  <tr key={i} className={!row.email.includes('@') ? 'bg-red-50' : ''}>
                    <td className="px-4 py-2 text-gray-700">{row.business_name || '—'}</td>
                    <td className="px-4 py-2 text-gray-500">{row.email || '—'}</td>
                    <td className="px-4 py-2 text-gray-400">{row.location || '—'}</td>
                    <td className="px-4 py-2 text-gray-400">{row.industry || '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Upload button */}
      {file && status !== 'done' && (
        <button
          onClick={handleUpload}
          disabled={status === 'uploading'}
          className="w-full py-3 rounded-xl font-semibold text-sm transition-opacity disabled:opacity-60"
          style={{ backgroundColor: '#0f1f3d', color: '#fff' }}
        >
          {status === 'uploading' ? 'Importing…' : 'Import Contacts'}
        </button>
      )}

      {/* Result */}
      {result && (
        <div
          className="mt-4 rounded-xl px-5 py-4 text-sm font-medium"
          style={{
            backgroundColor: status === 'done' ? '#ecfdf5' : '#fef2f2',
            color: status === 'done' ? '#059669' : '#dc2626',
          }}
        >
          {status === 'done'
            ? `✓ Imported ${result.imported} new contacts (${result.parsed} rows parsed)`
            : `✗ ${result.error ?? 'Something went wrong.'}`}
        </div>
      )}

      {/* Template download */}
      <div className="mt-10 p-5 rounded-xl bg-gray-50 border border-gray-100">
        <p className="text-sm font-semibold text-gray-700 mb-2">CSV Template</p>
        <p className="text-xs text-gray-400 mb-3">Copy the header row below to start your spreadsheet:</p>
        <code className="block text-xs bg-white border border-gray-200 rounded-lg p-3 text-gray-600 break-all">
          business_name,website_url,email,location,industry,cms
        </code>
        <p className="text-xs text-gray-400 mt-2">Example: Acme Plumbing,https://acmeplumbing.com,owner@acmeplumbing.com,"Denver, CO",plumbing,wordpress</p>
      </div>
    </div>
  )
}
