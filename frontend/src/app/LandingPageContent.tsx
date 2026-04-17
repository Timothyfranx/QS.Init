'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { 
  ArrowRight, 
  ChevronRight,
  CheckCircle2
} from 'lucide-react'
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
    <div className="flex flex-col min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-[100] h-20 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Logo className="text-[#FF4F00]" size={32} />
            <span className="text-xl font-black tracking-tighter uppercase italic text-slate-900 dark:text-white">QS.INIT</span>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <button 
              onClick={handleLaunch}
              className="px-6 py-2 border-2 border-[#FF4F00] text-[#FF4F00] text-xs font-black uppercase tracking-widest hover:bg-[#FF4F00] hover:text-white transition-all active:scale-95"
            >
              {isConnected ? 'Dashboard' : 'Launch'}
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow pt-32 pb-20">
        {/* HERO SECTION */}
        <div className="max-w-7xl mx-auto px-6 mb-24">
          <div className="inline-block bg-[#FF4F00] text-white px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] mb-8">
            Social Settlement v1.0
          </div>
          
          <h1 className="text-6xl md:text-8xl lg:text-[10rem] font-black uppercase tracking-tighter leading-[0.9] mb-12 text-slate-900 dark:text-white">
            Split bills <br />
            <span className="text-[#FF4F00]">not chains</span>
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-2xl md:text-3xl font-bold text-slate-700 dark:text-slate-300 leading-snug max-w-xl">
                Sign up with <span className="text-[#FF4F00]">Google</span> or <span className="text-[#FF4F00]">X</span>. No seed phrases, no jargon. 
              </p>
              <p className="text-lg text-slate-500 dark:text-slate-400 max-w-lg leading-relaxed">
                QS.INIT automatically finds your scattered balances across the entire ecosystem to settle debts in one click.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              <button 
                onClick={handleLaunch}
                className="w-full h-24 bg-[#FF4F00] text-white text-2xl font-black uppercase tracking-widest flex items-center justify-between px-10 shadow-2xl hover:brightness-110 transition-all active:scale-[0.98] group"
              >
                Enter App <ArrowRight size={36} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-8 justify-center lg:justify-start">
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                    <CheckCircle2 size={14} className="text-[#FF4F00]" /> Interwoven
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                    <CheckCircle2 size={14} className="text-[#FF4F00]" /> MiniEVM
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-black uppercase text-slate-400">
                    <CheckCircle2 size={14} className="text-[#FF4F00]" /> No Gas
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* FEATURES GRID */}
        <div id="features" className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-1px bg-slate-200 dark:bg-slate-800 border border-slate-200 dark:border-slate-800 mb-32">
          {[
            { 
              title: "Simple", 
              desc: "Zero blockchain jargon. If you can use Venmo, you can use QS.INIT. We hide the complexity." 
            },
            { 
              title: "Aggregated", 
              desc: "Our AI Sweeper finds your balances across Move, Wasm, and EVM rollups automatically." 
            },
            { 
              title: "Secure", 
              desc: "Session Keys eliminate wallet signature spam. Authorize once, settle everything." 
            }
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-slate-950 p-10 md:p-12 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
              <span className="text-[#FF4F00] font-black text-xs tracking-widest mb-6 block">0{i+1}</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 text-slate-900 dark:text-white">{item.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* MISSION SECTION */}
        <div className="bg-slate-900 dark:bg-slate-900/50 py-32 mb-32">
           <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-20 items-center">
              <div className="flex-1 space-y-8">
                 <h2 className="text-6xl md:text-7xl font-black uppercase tracking-tighter leading-none text-white">
                    Built on <br /><span className="text-[#FF4F00]">Initia</span>
                 </h2>
                 <p className="text-xl font-bold text-slate-300 leading-snug max-w-xl">
                    The Interwoven Stack is the only engine capable of true social settlement.
                 </p>
                 <div className="flex flex-wrap gap-x-8 gap-y-4 pt-4 opacity-40 grayscale contrast-200 text-white font-black tracking-tighter uppercase text-sm italic">
                    <span>MINI-EVM</span>
                    <span>MINI-MOVE</span>
                    <span>MINI-WASM</span>
                    <span>OMNI-USDC</span>
                 </div>
              </div>
              <div className="flex-1 flex justify-center">
                 <div className="relative p-12 border-8 border-[#FF4F00]">
                    <Logo className="text-[#FF4F00] mb-8" size={80} />
                    <div className="text-6xl font-black italic tracking-tighter text-[#FF4F00]">KARMA</div>
                    <div className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-white">Verified Identity</div>
                 </div>
              </div>
           </div>
        </div>

        {/* FINAL CTA */}
        <div className="max-w-5xl mx-auto px-6 text-center">
           <h2 className="text-7xl md:text-9xl font-black uppercase tracking-tighter mb-16 italic text-slate-900 dark:text-white">Ready?</h2>
           <button 
             onClick={handleLaunch}
             className="w-full h-32 bg-slate-900 dark:bg-white text-white dark:text-black text-4xl font-black uppercase tracking-tighter hover:bg-[#FF4F00] dark:hover:bg-[#FF4F00] hover:text-white dark:hover:text-white transition-all active:scale-95 shadow-2xl flex items-center justify-center gap-6"
           >
              Launch Dashboard <ChevronRight size={48} strokeWidth={4} />
           </button>
        </div>
      </main>

      <footer className="border-t border-slate-200 dark:border-slate-800 py-12 bg-slate-50 dark:bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo size={24} className="text-[#FF4F00]" />
            <span className="font-black uppercase tracking-tighter text-slate-900 dark:text-white">QS.INIT</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-widest text-slate-400">
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Docs</span>
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Github</span>
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Security</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 italic">© 2026 INITIATE HACKATHON</p>
        </div>
      </footer>
    </div>
  )
}
