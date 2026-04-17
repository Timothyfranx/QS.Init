'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  ArrowLeft, 
  Search, 
  QrCode,
  Zap,
  ChevronRight
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from '@/components/Logo'

export default function JoinContent() {
  const router = useRouter()
  const [splitId, setSplitId] = useState('')
  const [error, setError] = useState('')

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (splitId.trim().length < 3) {
      setError('Enter a valid code')
      return
    }
    router.push(`/split/${splitId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] font-sans transition-colors">
       <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-[#FF4F00] text-white shadow-md transition hover:scale-105 active:scale-95"><Logo size={20} /></a>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-slate-900 dark:text-white italic">Join</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-xl px-4 py-8 sm:py-24">
        <motion.a 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          href="/dashboard" 
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Back
        </motion.a>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-none border-l-4 sm:border-l-8 border-slate-900 dark:border-[#FF4F00] bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-2xl"
        >
          <div className="mb-12">
            <div className="mb-6 flex h-14 w-14 items-center justify-center bg-slate-900 dark:bg-[#FF4F00] text-white shadow-lg">
              <Search size={32} />
            </div>
            <h1 className="text-4xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-5xl uppercase italic leading-none">Join Split</h1>
            <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">
              Enter the invite code to settle up instantly.
            </p>
          </div>

          <form onSubmit={handleJoin} className="space-y-8">
            <div>
              <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Invite Code
              </label>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="e.g. 8xJ9-K2L1" 
                  autoFocus
                  className="w-full rounded-none border-2 border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-950/30 px-6 py-5 font-black text-2xl text-slate-900 dark:text-white placeholder:text-slate-200 dark:placeholder:text-slate-800 focus:border-slate-900 dark:focus:border-[#FF4F00] focus:bg-white dark:focus:bg-slate-950 focus:outline-none transition-all"
                  value={splitId}
                  onChange={e => { setSplitId(e.target.value); setError(''); }}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2">
                   <QrCode size={24} className="text-slate-300 dark:text-slate-700 cursor-pointer hover:text-[#FF4F00] transition-colors" />
                </div>
              </div>
              {error && <p className="mt-3 text-xs font-black text-red-500 uppercase tracking-widest italic">{error}</p>}
            </div>

            <button 
              type="submit"
              className="w-full h-20 bg-slate-900 dark:bg-[#FF4F00] text-xl font-black text-white shadow-2xl transition hover:brightness-110 active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Access Split <ChevronRight size={24} strokeWidth={3} />
            </button>
          </form>
        </motion.div>
      </main>

      <footer className="py-12 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 italic">Safe · Simple · Social</p>
      </footer>
    </div>
  )
}
