'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { ArrowRight, ChevronRight, CheckCircle2 } from 'lucide-react'
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
    <div className="w-full min-h-screen bg-white dark:bg-[#020617] text-slate-900 dark:text-slate-100 flex flex-col transition-colors duration-500">
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-[999] h-20 bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo className="text-[#FF4F00]" size={32} />
            <span className="text-xl font-black uppercase italic tracking-tighter">QS.INIT</span>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button 
              onClick={handleLaunch}
              className="px-6 py-2.5 bg-[#FF4F00] text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all shadow-lg"
            >
              {isConnected ? 'Dashboard' : 'Launch App'}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN BODY - Forced Vertical Separation */}
      <main className="flex flex-col gap-32 pt-40 pb-40">
        
        {/* HERO SECTION */}
        <section className="w-full max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <span className="bg-[#FF4F00] text-white px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.4em] italic">
              Social Settlement Layer v1.0
            </span>
          </div>
          
          <div className="flex flex-col mb-20">
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-slate-900 dark:text-white"
              style={{ lineHeight: '1.05', marginBottom: '0.1em' }}
            >
              SPLIT BILLS
            </h1>
            <h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-[#FF4F00]"
              style={{ lineHeight: '1.05' }}
            >
              NOT CHAINS
            </h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
             <div className="lg:col-span-8 border-l-8 border-[#FF4F00] pl-10 py-4">
                <p className="text-2xl md:text-4xl font-bold leading-tight text-slate-800 dark:text-slate-200 mb-8 max-w-2xl">
                  Sign up with <span className="text-[#FF4F00]">Google</span> or <span className="text-[#FF4F00]">X</span>. No seed phrases, no jargon.
                </p>
                <p className="text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed max-w-xl">
                  QS.INIT automatically aggregates your scattered balances across the Interwoven World to settle debts in one click.
                </p>
             </div>

             <div className="lg:col-span-4 flex flex-col gap-8">
                <button 
                  onClick={handleLaunch}
                  className="w-full h-24 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-2xl font-black uppercase tracking-[0.2em] flex items-center justify-between px-10 shadow-2xl hover:bg-[#FF4F00] hover:text-white dark:hover:bg-[#FF4F00] dark:hover:text-white transition-all active:scale-[0.98] group"
                >
                  ENTER <ArrowRight size={40} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex flex-wrap gap-6 justify-center lg:justify-start opacity-60">
                   {['INTERWOVEN', 'MINIEVM', 'NO GAS'].map(tag => (
                     <div key={tag} className="flex items-center gap-2 text-[10px] font-black tracking-widest uppercase">
                       <CheckCircle2 size={14} className="text-[#FF4F00]" /> {tag}
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </section>

        {/* SPECS SECTION */}
        <section className="w-full max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { t: "SIMPLE", d: "Zero blockchain jargon. If you can use Venmo, you can use QS.INIT. We hide the complexity." },
            { t: "AGGREGATED", d: "Our AI Sweeper finds your balances across Move, Wasm, and EVM rollups automatically." },
            { t: "SECURE", d: "Session Keys eliminate wallet signature spam. Authorize once, settle everything." }
          ].map((item, i) => (
            <div key={i} className="group bg-slate-50 dark:bg-slate-900/40 p-12 border border-slate-100 dark:border-slate-800 hover:border-[#FF4F00] transition-all">
               <span className="text-[#FF4F00] font-black text-xs tracking-widest block mb-8">0{i+1} — SPECS</span>
               <h3 className="text-3xl font-black uppercase italic mb-6">{item.t}</h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed text-lg">{item.d}</p>
            </div>
          ))}
        </section>

        {/* MISSION SECTION */}
        <section className="w-full bg-slate-950 py-40">
           <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-24 items-center">
              <div className="flex-1 space-y-12">
                 <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter leading-[0.9]">
                    BUILT ON <br /> <span className="text-[#FF4F00]">INITIA</span>
                 </h2>
                 <p className="text-xl md:text-2xl text-slate-300 font-bold max-w-lg leading-snug">
                    The Interwoven Stack is the only engine capable of true social settlement.
                 </p>
                 <div className="flex flex-wrap gap-8 pt-6 opacity-30 text-white font-black tracking-tighter uppercase text-sm italic">
                    <span>MINI-EVM</span>
                    <span>MINI-MOVE</span>
                    <span>MINI-WASM</span>
                    <span>OMNI-USDC</span>
                 </div>
              </div>
              <div className="flex-1 flex justify-center lg:justify-end">
                 <div className="p-16 md:p-20 border-8 border-[#FF4F00] bg-slate-900 shadow-2xl relative">
                    <Logo className="text-[#FF4F00] mb-12" size={100} />
                    <div className="text-6xl md:text-7xl font-black italic tracking-tighter text-[#FF4F00] uppercase">KARMA</div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.5em] text-white/50">Verified Network Identity</div>
                    <div className="absolute top-0 right-0 h-4 w-4 bg-[#FF4F00]"></div>
                    <div className="absolute bottom-0 left-0 h-4 w-4 bg-[#FF4F00]"></div>
                 </div>
              </div>
           </div>
        </section>

        {/* READY CTA */}
        <section className="w-full max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-8xl md:text-[10rem] font-black uppercase italic tracking-tighter mb-20 text-slate-900 dark:text-white leading-none">READY?</h2>
           <button 
             onClick={handleLaunch}
             className="w-full h-32 bg-[#FF4F00] text-white text-4xl font-black uppercase tracking-[0.1em] shadow-[0_20px_50px_rgba(255,79,0,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-8"
           >
             LAUNCH DASHBOARD <ChevronRight size={48} strokeWidth={4} />
           </button>
           <p className="mt-12 text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Join the social layer of the interwoven world</p>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-200 dark:border-slate-800 py-16 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-12">
           <div className="flex items-center gap-4">
             <div className="p-2 bg-[#FF4F00]"><Logo size={24} className="text-white" /></div>
             <span className="font-black uppercase tracking-tighter text-lg">QS.INIT</span>
           </div>
           <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              <span className="hover:text-[#FF4F00] cursor-pointer transition">Documentation</span>
              <span className="hover:text-[#FF4F00] cursor-pointer transition">Github</span>
              <span className="hover:text-[#FF4F00] cursor-pointer transition">Security</span>
           </div>
           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">© 2026 INITIATE HACKATHON</p>
        </div>
      </footer>
    </div>
  )
}
