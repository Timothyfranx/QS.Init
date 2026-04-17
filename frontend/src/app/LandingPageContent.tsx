'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { 
  ArrowRight, 
  ShieldCheck, 
  Smartphone,
  Coins,
  ChevronRight,
  Zap,
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
    <div className="min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-50 transition-colors duration-300 font-sans">
      {/* NAV - Higher Z-Index */}
      <nav className="fixed top-0 z-[100] w-full border-b border-slate-100 dark:border-slate-900 bg-white/90 dark:bg-[#050505]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-4">
            <Logo className="text-[#FF4F00]" size={32} />
            <span className="text-xl sm:text-2xl font-black tracking-tight uppercase italic">QS.INIT</span>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button 
              onClick={handleLaunch}
              className="h-10 sm:h-12 border-2 border-slate-900 dark:border-white bg-transparent px-4 sm:px-6 text-[10px] font-black uppercase tracking-[0.2em] transition hover:bg-slate-900 hover:text-white dark:hover:bg-white dark:hover:text-black active:scale-95"
            >
              {isConnected ? 'Dashboard' : 'Launch'}
            </button>
          </div>
        </div>
      </nav>

      <main className="pt-24 sm:pt-32">
        {/* HERO - Simplified Layout */}
        <section className="px-6 py-12 sm:py-24 lg:py-32 border-b border-slate-100 dark:border-slate-900">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8 flex justify-start">
              <span className="bg-[#FF4F00] px-4 py-1 text-[10px] font-black uppercase tracking-[0.3em] text-white italic">
                Social Settlement v1.0
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black uppercase tracking-tighter leading-tight mb-12 text-slate-900 dark:text-white">
              Split bills <br />
              <span className="text-[#FF4F00]">not chains</span>
            </h1>
            
            <div className="max-w-4xl space-y-12">
              <div className="border-l-8 border-[#FF4F00] pl-8">
                 <p className="text-2xl sm:text-4xl font-bold leading-snug text-slate-800 dark:text-slate-200">
                   Sign up with <span className="text-[#FF4F00]">Google</span> or <span className="text-[#FF4F00]">X</span>. No seed phrases, no jargon. 
                 </p>
                 <p className="mt-6 text-lg sm:text-xl font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                   QS.INIT automatically finds your scattered balances across the entire ecosystem to settle debts in one click.
                 </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <button 
                  onClick={handleLaunch}
                  className="h-24 px-12 bg-[#FF4F00] text-2xl font-black uppercase tracking-widest text-white shadow-2xl transition hover:brightness-110 active:scale-[0.98] flex items-center justify-between gap-8 group"
                >
                  Enter App <ArrowRight size={36} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
                </button>
                
                <div className="flex flex-col justify-center">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <CheckCircle2 size={14} className="text-[#FF4F00]" /> Interwoven Enabled
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">
                    <CheckCircle2 size={14} className="text-[#FF4F00]" /> MiniEVM Core
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SPECS */}
        <section className="grid grid-cols-1 md:grid-cols-3 border-b border-slate-100 dark:border-slate-900 bg-slate-50/50 dark:bg-slate-950/50">
          {[
            { 
              label: "01",
              title: "Consumer Simple", 
              desc: "Zero blockchain jargon. If you can use Venmo, you can use QS.INIT. We hide the complexity of Minitias under a clean social layer." 
            },
            { 
              label: "02",
              title: "Aggregated Wealth", 
              desc: "Scattered funds? Our AI Sweeper finds your balances across Move, Wasm, and EVM rollups and bridges them automatically." 
            },
            { 
              label: "03",
              title: "One-Click Safety", 
              desc: "Session Keys eliminate wallet signature spam. Authorize the agent once and settle your entire weekend in seconds." 
            }
          ].map((item, i) => (
            <div key={i} className="p-12 lg:p-16 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-900 last:border-0 hover:bg-white dark:hover:bg-slate-900 transition-colors group">
              <span className="text-[#FF4F00] font-black text-xs tracking-widest block mb-8">{item.label}</span>
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-6 text-slate-900 dark:text-white">{item.title}</h3>
              <p className="font-medium text-slate-500 dark:text-slate-400 leading-relaxed text-lg">{item.desc}</p>
            </div>
          ))}
        </section>

        {/* MISSION - Fixed Decorative Elements */}
        <section className="px-6 py-24 lg:py-48 bg-slate-950 text-white overflow-hidden">
           <div className="mx-auto max-w-7xl">
              <div className="flex flex-col lg:flex-row gap-20 items-center">
                 <div className="flex-1">
                    <h2 className="text-6xl sm:text-8xl font-black uppercase tracking-tighter leading-tight mb-12">
                       Built on <br /><span className="text-[#FF4F00]">Initia</span>
                    </h2>
                    <div className="space-y-8 max-w-xl">
                       <p className="text-xl font-bold leading-snug">The Interwoven Stack is the only engine capable of true social settlement.</p>
                       <p className="text-slate-400 text-lg font-medium leading-relaxed">
                          By leveraging Initia's Interwoven Bridge and OPinit stack, we've removed the barriers between chains. No manual bridging. No switching networks. Just instant payments.
                       </p>
                       <div className="flex flex-wrap gap-8 pt-8 opacity-40 font-black tracking-tighter uppercase text-sm italic">
                          <span>MINI-EVM</span>
                          <span>MINI-MOVE</span>
                          <span>MINI-WASM</span>
                       </div>
                    </div>
                 </div>
                 
                 <div className="flex-1 flex justify-center lg:justify-end">
                    <div className="relative p-12 border-4 border-[#FF4F00] bg-slate-900/50 backdrop-blur-3xl">
                       <Logo className="text-[#FF4F00] mb-12" size={80} />
                       <div className="text-5xl font-black italic tracking-tighter text-[#FF4F00]">KARMA</div>
                       <div className="mt-4 text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Aggregated Reputation</div>
                       <div className="absolute -top-4 -right-4 h-8 w-8 bg-[#FF4F00]"></div>
                       <div className="absolute -bottom-4 -left-4 h-8 w-8 bg-[#FF4F00]"></div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* CTA */}
        <section className="px-6 py-32 lg:py-48 text-center bg-white dark:bg-[#050505]">
           <div className="mx-auto max-w-4xl">
              <h2 className="text-7xl sm:text-9xl font-black uppercase tracking-tighter mb-16 italic text-slate-900 dark:text-white">Ready?</h2>
              <button 
                onClick={handleLaunch}
                className="h-32 w-full bg-slate-900 dark:bg-white text-white dark:text-black text-4xl font-black uppercase tracking-tighter transition hover:bg-[#FF4F00] hover:text-white dark:hover:bg-[#FF4F00] dark:hover:text-white active:scale-95 shadow-2xl flex items-center justify-center gap-6"
              >
                 Launch Dashboard <ChevronRight size={40} strokeWidth={4} />
              </button>
           </div>
        </section>
      </main>

      <footer className="border-t border-slate-100 dark:border-slate-900 p-12 bg-slate-50/50 dark:bg-slate-950/50">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <Logo size={24} className="text-[#FF4F00]" />
            <span className="font-black uppercase tracking-tighter text-slate-900 dark:text-white">QS.INIT</span>
          </div>
          <div className="flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Docs</span>
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Github</span>
             <span className="hover:text-[#FF4F00] cursor-pointer transition">Security</span>
          </div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">© 2026 INITIATE HACKATHON</p>
        </div>
      </footer>
    </div>
  )
}
