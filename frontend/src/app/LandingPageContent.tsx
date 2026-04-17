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
    <div className="w-full min-h-screen bg-white dark:bg-slate-950 flex flex-col items-stretch overflow-x-hidden transition-colors duration-300">
      {/* HEADER - Fixed Height & High Z-Index */}
      <nav className="fixed top-0 left-0 right-0 z-[999] h-20 bg-white/90 dark:bg-slate-950/90 border-b border-slate-100 dark:border-slate-800 backdrop-blur-md">
        <div className="max-w-6xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo className="text-[#FF4F00]" size={32} />
            <span className="text-xl font-black uppercase italic tracking-tighter text-slate-900 dark:text-white">QS.INIT</span>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={handleLaunch}
              className="px-6 py-2 bg-[#FF4F00] text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all"
            >
              {isConnected ? 'Dashboard' : 'Launch'}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO SECTION - Explicit Vertical Spacing */}
      <main className="flex flex-col items-center pt-32 pb-20">
        
        {/* TOP BADGE */}
        <div className="w-full max-w-6xl px-6 mb-12">
          <div className="inline-block bg-slate-900 dark:bg-[#FF4F00] text-white px-4 py-1 text-[9px] font-black uppercase tracking-[0.3em] italic">
            Industrial Social v1.0
          </div>
        </div>

        {/* MASSIVE TITLES - No Overlap Leading */}
        <div className="w-full max-w-6xl px-6 mb-20">
          <div className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-tight text-slate-900 dark:text-white mb-4">
            SPLIT BILLS
          </div>
          <div className="text-5xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter leading-tight text-[#FF4F00]">
            NOT CHAINS
          </div>
        </div>

        {/* CALL TO ACTION GRID */}
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 mb-32 items-start">
           <div className="border-l-4 border-[#FF4F00] pl-8 py-2">
              <p className="text-2xl md:text-3xl font-bold leading-relaxed text-slate-700 dark:text-slate-300 mb-6">
                Sign up with <span className="text-[#FF4F00]">Google</span> or <span className="text-[#FF4F00]">X</span>. No seed phrases, no jargon.
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 leading-loose">
                We find your balances across Move, Wasm, and EVM rollups and bridge them automatically.
              </p>
           </div>

           <div className="flex flex-col gap-6">
              <button 
                onClick={handleLaunch}
                className="w-full h-24 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-2xl font-black uppercase tracking-widest flex items-center justify-between px-10 shadow-2xl hover:bg-[#FF4F00] hover:text-white dark:hover:bg-[#FF4F00] dark:hover:text-white transition-all active:scale-[0.98] group"
              >
                ENTER APP <ArrowRight size={36} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start opacity-50">
                 {['INTERWOVEN', 'MINIEVM', 'NO GAS'].map(tag => (
                   <span key={tag} className="text-[10px] font-black tracking-widest uppercase flex items-center gap-2">
                     <CheckCircle2 size={12} className="text-[#FF4F00]" /> {tag}
                   </span>
                 ))}
              </div>
           </div>
        </div>

        {/* SPECS GRID */}
        <div className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {[
            { t: "SIMPLE", d: "If you can use Venmo, you can use QS.INIT. No complexity." },
            { t: "AGGREGATED", d: "AI Sweeper finds dust across every Initia rollup instantly." },
            { t: "SECURE", d: "Session Keys eliminate wallet signature spam. Secure by default." }
          ].map((item, i) => (
            <div key={i} className="bg-slate-50 dark:bg-slate-900/50 p-10 border border-slate-100 dark:border-slate-800">
               <span className="text-[#FF4F00] font-black text-xs block mb-6">SPECS 0{i+1}</span>
               <h3 className="text-2xl font-black uppercase italic mb-4 text-slate-900 dark:text-white">{item.t}</h3>
               <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>

        {/* REPUTATION BLOCK */}
        <div className="w-full bg-slate-900 py-32 mb-40">
           <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 text-center lg:text-left">
                 <h2 className="text-6xl md:text-8xl font-black uppercase text-white tracking-tighter leading-none mb-8">
                    BUILT ON <br /> <span className="text-[#FF4F00]">INITIA</span>
                 </h2>
                 <p className="text-xl text-slate-400 font-bold max-w-md mx-auto lg:mx-0">The Interwoven Stack is the only engine capable of social settlement.</p>
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="p-16 border-4 border-[#FF4F00] bg-slate-950 shadow-[0_0_50px_rgba(255,79,0,0.1)]">
                    <Logo className="text-[#FF4F00] mb-12" size={100} />
                    <div className="text-6xl font-black italic tracking-tighter text-[#FF4F00]">KARMA</div>
                 </div>
              </div>
           </div>
        </div>

        {/* READY CTA */}
        <div className="w-full max-w-4xl px-6 text-center">
           <h2 className="text-7xl md:text-9xl font-black uppercase italic tracking-tighter mb-16 text-slate-900 dark:text-white">READY?</h2>
           <button 
             onClick={handleLaunch}
             className="h-32 w-full bg-[#FF4F00] text-white text-4xl font-black uppercase tracking-widest shadow-2xl hover:brightness-110 active:scale-95 transition-all"
           >
             LAUNCH DASHBOARD
           </button>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full border-t border-slate-100 dark:border-slate-900 py-12 bg-white dark:bg-slate-950">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="flex items-center gap-3">
             <Logo size={24} className="text-[#FF4F00]" />
             <span className="font-black uppercase tracking-tighter">QS.INIT</span>
           </div>
           <div className="flex gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition">Docs</span>
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition">Github</span>
              <span className="hover:text-slate-900 dark:hover:text-white cursor-pointer transition">Security</span>
           </div>
           <p className="text-[10px] font-black uppercase text-slate-300">© 2026 INITIATE HACKATHON</p>
        </div>
      </footer>
    </div>
  )
}
