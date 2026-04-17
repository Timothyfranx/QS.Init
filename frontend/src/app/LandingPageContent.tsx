'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { ArrowRight, ChevronRight, Zap, Shield, BarChart3 } from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from '@/components/Logo'

export default function LandingPageContent() {
  const router = useRouter()
  const { isConnected, openConnect } = useInterwovenKit()
  const [isRedirecting, setIsRedirecting] = useState(false)

  useEffect(() => {
    if (isConnected && isRedirecting) {
      router.push('/dashboard')
    }
  }, [isConnected, isRedirecting, router])

  const handleLaunch = () => {
    if (isConnected) {
      router.push('/dashboard')
    } else {
      setIsRedirecting(true)
      openConnect()
    }
  }

  return (
    <div className="flex flex-col min-h-screen industrial-grid bg-white dark:bg-black transition-colors duration-500">
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 glass border-b-2 border-primary/20">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <Logo className="text-primary animate-pulse" size={36} />
            <div className="flex flex-col">
              <span className="text-2xl font-black uppercase italic tracking-tighter leading-none">QS.INIT</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-primary">Interwoven Settlement</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button 
              onClick={handleLaunch}
              className="px-6 py-2 border-2 border-primary text-primary text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all"
            >
              {isConnected ? 'Dashboard' : 'Launch'}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="flex-grow flex flex-col pt-40 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto w-full flex flex-col gap-12 lg:gap-24">
          
          {/* BIG TEXT BLOCK */}
          <div className="flex flex-col gap-2 relative">
             {/* THE "FORGOTTEN" ACCENT CODE */}
             <div className="absolute -top-12 -left-4 w-20 h-2 bg-primary"></div>
             
             <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-black uppercase italic leading-[0.9] tracking-[-0.05em] text-slate-900 dark:text-white">
               Split bills <br />
               <span className="text-primary stroke-text">Not chains</span>
             </h1>

             <div className="max-w-xl mt-8 p-8 border-l-4 border-primary bg-slate-50 dark:bg-slate-900/50">
               <p className="text-xl md:text-2xl font-bold leading-tight mb-4">
                 Sign up with <span className="text-primary">Google</span> or <span className="text-primary">X</span>. No seed phrases, no jargon.
               </p>
               <p className="text-slate-500 dark:text-slate-400 font-medium">
                 QS.INIT automatically aggregates your scattered balances across the Interwoven World to settle debts in one click.
               </p>
             </div>
          </div>

          {/* CTAs & STATS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             <button 
               onClick={handleLaunch}
               className="btn-industrial col-span-1 md:col-span-2 flex items-center justify-between h-24 text-2xl"
             >
               Enter App <ArrowRight size={36} strokeWidth={3} />
             </button>
             
             <div className="bg-primary p-6 flex flex-col justify-center text-white">
                <span className="text-xs font-black uppercase tracking-widest opacity-80 mb-2">Network Status</span>
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 bg-white animate-ping rounded-full"></div>
                   <span className="text-xl font-black uppercase tracking-tighter">INITIATION-2 LIVE</span>
                </div>
             </div>
          </div>

          {/* FEATURE TILES */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {[
              { icon: Zap, t: "Instant", d: "Zero-latency bridging across every Initia Mini-Rollup." },
              { icon: Shield, t: "Secure", d: "Session Keys eliminate signature fatigue and wallet spam." },
              { icon: BarChart3, t: "Unified", d: "View your total net worth across Move, Wasm, and EVM." }
            ].map((f, i) => (
              <div key={i} className="card-industrial group hover:border-primary transition-colors">
                <f.icon className="text-primary mb-6 group-hover:scale-110 transition-transform" size={40} />
                <h3 className="text-2xl font-black mb-3 italic">{f.t}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{f.d}</p>
                <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary/5 group-hover:bg-primary/20 transition-colors"></div>
              </div>
            ))}
          </div>

          {/* MISSION LOGO SECTION */}
          <div className="w-full bg-slate-900 dark:bg-slate-900/40 border-2 border-primary/20 p-12 lg:p-24 relative overflow-hidden">
             {/* THE BACKGROUND "FORGOTTEN" TEXT */}
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20vw] font-black uppercase italic opacity-[0.03] pointer-events-none select-none">
                INTERWOVEN
             </div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-20">
                <div className="flex-1 space-y-8">
                   <h2 className="text-5xl md:text-7xl font-black text-white leading-none tracking-tighter uppercase italic">
                      BUILT FOR <br /> <span className="text-primary">INITIA</span>
                   </h2>
                   <p className="text-xl text-slate-300 font-bold max-w-lg">
                      Leveraging the Interwoven Stack to eliminate the barriers between chains. No manual bridging. No switching networks. Just instant payments.
                   </p>
                   <div className="flex gap-4">
                      <div className="h-1 w-20 bg-primary"></div>
                      <div className="h-1 w-10 bg-primary/30"></div>
                      <div className="h-1 w-5 bg-primary/10"></div>
                   </div>
                </div>
                <div className="flex-shrink-0">
                   <div className="w-64 h-64 md:w-80 md:h-80 border-8 border-primary flex items-center justify-center bg-black shadow-[0_0_80px_rgba(255,79,0,0.2)]">
                      <div className="flex flex-col items-center">
                         <Logo className="text-primary mb-6" size={120} />
                         <span className="text-4xl font-black text-primary italic tracking-tighter">KARMA</span>
                         <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white mt-2">Verified Social Layer</span>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-primary/10 py-16 bg-slate-50 dark:bg-black/80">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary flex items-center justify-center">
              <Logo className="text-white" size={24} />
            </div>
            <span className="text-xl font-black uppercase italic tracking-tighter">QS.INIT</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             <span className="hover:text-primary cursor-pointer transition">Docs</span>
             <span className="hover:text-primary cursor-pointer transition">Github</span>
             <span className="hover:text-primary cursor-pointer transition">Security</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 italic">© 2026 INITIATE HACKATHON // BUILT BY OMNI DIVISION</p>
        </div>
      </footer>
    </div>
  )
}
