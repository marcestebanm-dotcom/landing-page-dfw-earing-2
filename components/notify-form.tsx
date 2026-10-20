'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, Check } from 'lucide-react'

export function NotifyForm() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!email) return
    setSent(true)
  }

  if (sent) {
    return (
      <div className="flex items-center gap-3 rounded-full border border-dfw-blue/30 bg-soft-cream px-5 py-4 text-sm">
        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-dfw-blue text-cream">
          <Check className="size-4" aria-hidden="true" />
        </span>
        <p className="font-medium text-deep-blue">
          You&apos;re in! We&apos;ll let you know before we open on October 15.
        </p>
      </div>
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row"
      aria-label="Get notified about the launch"
    >
      <label htmlFor="notify-email" className="sr-only">
        Your email address
      </label>
      <input
        id="notify-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@email.com"
        className="h-13 flex-1 rounded-full border border-input bg-soft-cream px-5 text-sm text-ink outline-none transition placeholder:text-muted-foreground focus:border-dfw-blue focus:ring-2 focus:ring-dfw-blue/30"
      />
      <button
        type="submit"
        className="group inline-flex h-13 items-center justify-center gap-2 rounded-full bg-dfw-blue px-6 text-sm font-semibold uppercase tracking-[0.12em] text-cream transition hover:bg-deep-blue"
      >
        Notify me
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
      </button>
    </form>
  )
}
