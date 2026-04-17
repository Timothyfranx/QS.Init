'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { Search, Users, ArrowRight, ShieldCheck } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function JoinContent() {
  const router = useRouter()
  const { isConnected, openConnect } = useInterwovenKit()
  const [splitId, setSplitId] = useState('')

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isConnected) {
      openConnect()
      return
    }
    if (splitId.trim()) {
      router.push(`/split/${splitId}`)
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black industrial-grid flex flex-col transition-colors duration-500">
      {/* HEADER */}
      <nav className="h-20 glass border-b-2 border-primary/20 flex items-center px-6">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
           <button onClick={() => router.push('/')} className="flex items-center gap-3 group">
              <Logo className="text-primary group-hover:rotate-90 transition-transform" size={32} />
              <span className="text-2xl font-black uppercase italic tracking-tighter">QS.INIT</span>
           </button>
           <div className="flex items-center gap-6">
              <ThemeToggle />
              <button 
                onClick={() => router.push('/dashboard')}
                className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary transition-colors"
              >
                Exit
              </button>
           </div>
        </div>
      </nav>

      {/* CENTER CONTENT */}
      <main className="flex-grow flex items-center justify-center p-6">
        <div className="w-full max-w-xl">
           <div className="card-industrial bg-white dark:bg-slate-900 shadow-2xl overflow-visible">
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 bg-primary flex items-center justify-center shadow-xl">
                 <Users className="text-white" size={40} />
              </div>

              <div className="mt-12 text-center">
                 <h1 className="text-4xl font-black italic mb-2">Join a Split</h1>
                 <p className="text-sm font-medium text-slate-500 uppercase tracking-widest mb-10">Enter a settlement ID to begin</p>
                 
                 <form onSubmit={handleJoin} className="space-y-8">
                    <div className="relative group">
                       <input 
                         type="text" 
                         value={splitId}
                         onChange={(e) => setSplitId(e.target.value)}
                         placeholder="0x... or Room ID"
                         className="w-full h-20 bg-slate-50 dark:bg-black border-2 border-slate-200 dark:border-primary/20 px-8 pt-6 font-black uppercase tracking-widest text-xl focus:border-primary outline-none transition-all placeholder:text-slate-300"
                       />
                       <span className="absolute left-8 top-3 text-[8px] font-black uppercase tracking-[0.3em] text-primary opacity-60">Settlement ID</span>
                       <Search className="absolute right-8 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
                    </div>

                    <button 
                      type="submit"
                      disabled={!splitId}
                      className="btn-industrial w-full h-20 flex items-center justify-center gap-4 text-xl"
                    >
                      Find Group <ArrowRight size={28} strokeWidth={3} />
                    </button>
                 </form>

                 <div className="mt-12 pt-8 border-t border-slate-100 dark:border-primary/10 flex items-center justify-center gap-8 grayscale opacity-50">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                       <ShieldCheck size={14} className="text-primary" /> Verified
                    </div>
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-tighter">
                       <ShieldCheck size={14} className="text-primary" /> Interwoven
                    </div>
                 </div>
              </div>
           </div>

           <p className="mt-8 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              Secured by the Initiation-2 Network
           </p>
        </div>
      </main>
    </div>
  )
}
