'use client'

import React, { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { 
  ArrowLeft, 
  Clock, 
  CheckCircle2, 
  Users, 
  Zap, 
  CreditCard,
  ShieldAlert
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function SplitDetailContent() {
  const router = useRouter()
  const { id } = useParams()
  const { isConnected, openConnect } = useInterwovenKit()
  const [isPaying, setIsPaying] = useState(false)

  const handlePay = () => {
    if (!isConnected) {
      openConnect()
      return
    }
    setIsPaying(true)
    // Simulate payment sequence
    setTimeout(() => {
      setIsPaying(false)
      alert("Magic Pay Complete! Dust gathered and bridged via Interwoven Stack.")
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black industrial-grid flex flex-col transition-colors duration-500">
      <nav className="h-20 glass border-b-2 border-primary/20 flex items-center px-6 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
           <button onClick={() => router.push('/dashboard')} className="flex items-center gap-4 group">
              <ArrowLeft size={24} className="text-primary group-hover:-translate-x-2 transition-transform" />
              <div className="flex flex-col">
                 <span className="text-xl font-black italic tracking-tighter leading-none">Settlement Detail</span>
                 <span className="text-[8px] font-bold uppercase tracking-widest text-slate-500">ID: {id}</span>
              </div>
           </button>
           <div className="flex items-center gap-6">
              <ThemeToggle />
              <Logo className="text-primary" size={32} />
           </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* LEFT: INFO CARD */}
           <div className="lg:col-span-7 flex flex-col gap-8">
              <div className="card-industrial bg-slate-900 text-white border-none shadow-2xl p-10">
                 <div className="flex items-center gap-2 mb-6">
                    <span className="bg-primary text-white px-3 py-1 text-[8px] font-black uppercase tracking-widest">Active</span>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Created 2h ago</span>
                 </div>
                 
                 <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter mb-4">Noma Dinner</h1>
                 <div className="flex items-end gap-3 text-primary">
                    <span className="text-6xl font-black italic leading-none">$1,240.00</span>
                    <span className="text-sm font-black uppercase mb-1">USDC</span>
                 </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                 <div className="card-industrial">
                    <div className="flex items-center gap-3 text-primary mb-3">
                       <Users size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Participants</span>
                    </div>
                    <span className="text-3xl font-black italic">05 Total</span>
                 </div>
                 <div className="card-industrial">
                    <div className="flex items-center gap-3 text-primary mb-3">
                       <Clock size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Deadline</span>
                    </div>
                    <span className="text-3xl font-black italic">24 Hours</span>
                 </div>
              </div>

              <div className="card-industrial bg-slate-50 dark:bg-slate-900/50">
                 <h3 className="text-sm font-black uppercase tracking-widest mb-6">Settlement Progress</h3>
                 <div className="w-full h-4 bg-slate-200 dark:bg-black overflow-hidden mb-2">
                    <div className="w-3/5 h-full bg-primary animate-pulse"></div>
                 </div>
                 <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                    <span className="text-primary">3 Paid</span>
                    <span className="text-slate-400">2 Pending</span>
                 </div>
              </div>
           </div>

           {/* RIGHT: ACTION CARD */}
           <div className="lg:col-span-5 flex flex-col gap-6">
              <div className="card-industrial border-primary shadow-[10px_10px_0px_0px_rgba(255,79,0,0.1)]">
                 <div className="flex items-center justify-between mb-8 pb-4 border-b border-primary/10">
                    <span className="text-xs font-black uppercase tracking-widest italic">My Share</span>
                    <div className="flex items-center gap-2 text-primary">
                       <Zap size={16} fill="currentColor" />
                       <span className="text-[10px] font-black uppercase tracking-widest">AI Ready</span>
                    </div>
                 </div>

                 <div className="text-center mb-10">
                    <div className="text-sm font-black text-slate-400 uppercase tracking-widest mb-2 italic">Amount Owed</div>
                    <div className="text-6xl font-black italic text-slate-900 dark:text-white">$248.00</div>
                 </div>

                 <button 
                   onClick={handlePay}
                   disabled={isPaying}
                   className={`btn-industrial w-full h-24 flex items-center justify-center gap-4 text-2xl relative overflow-hidden group
                    ${isPaying ? 'brightness-50' : ''}`}
                 >
                    {isPaying ? (
                      <div className="flex items-center gap-4">
                         <RefreshCw size={24} className="animate-spin" />
                         SWEEPING...
                      </div>
                    ) : (
                      <>
                        MAGIC PAY <CreditCard size={28} />
                      </>
                    )}
                    {/* ANIMATED SWEEP LINE */}
                    <div className="absolute top-0 -left-full w-full h-1 bg-white/30 animate-[sweep_2s_infinite]"></div>
                 </button>

                 <div className="mt-8 space-y-4">
                    <div className="flex items-start gap-3">
                       <CheckCircle2 size={16} className="text-primary mt-0.5" />
                       <p className="text-[10px] font-medium text-slate-500 leading-tight">AI Sweeper found $50.00 dust on MiniEVM-1 and $200.00 on MiniMove-2.</p>
                    </div>
                    <div className="flex items-start gap-3">
                       <ShieldAlert size={16} className="text-slate-300 mt-0.5" />
                       <p className="text-[10px] font-medium text-slate-400 leading-tight italic">Session keys authorized. No signatures required.</p>
                    </div>
                 </div>
              </div>

              <div className="card-industrial bg-slate-50 dark:bg-slate-900/50 p-6 flex items-center justify-between">
                 <div className="flex items-center gap-3 text-primary">
                    <Users size={20} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Who's In</span>
                 </div>
                 <div className="flex -space-x-2">
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-primary bg-slate-900 flex items-center justify-center text-[10px] font-black text-white">
                         P{i}
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}

// Internal icons needed
const RefreshCw = ({ size, className }: { size: number, className: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M3 21v-5h5" />
  </svg>
)
