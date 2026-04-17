'use client'

import React, { useState } from 'react'
import { useInterwovenKit, usePortfolio } from '@initia/interwovenkit-react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  TrendingUp, 
  Plus, 
  Search, 
  ShieldCheck, 
  Clock,
  LogOut,
  ChevronRight,
  ExternalLink,
  Loader2
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from '@/components/Logo'

export default function DashboardContent() {
  const kit = useInterwovenKit()
  const portfolio = usePortfolio()
  const [activeTab, setActiveTab] = useState('active')

  const { address, isConnected, openConnect, disconnect } = kit
  const { totalValue, assetGroups, isLoading: isPortfolioLoading } = portfolio

  if (!isConnected) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-white dark:bg-[#050505] p-6 text-center transition-colors">
        <div className="absolute top-4 right-4 sm:top-8 sm:right-8"><ThemeToggle /></div>
        <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-2xl sm:rounded-[2.5rem] bg-slate-900 dark:bg-[#FF4F00] text-white shadow-2xl mb-8 sm:mb-10">
          <Logo size={40} className="text-white" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white uppercase italic">Access App</h1>
        <p className="mt-4 max-w-sm text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium px-4">Connect your wallet to aggregate your wealth across the Interwoven World.</p>
        <button onClick={() => openConnect()} className="mt-8 sm:mt-10 h-14 sm:h-16 w-full max-w-xs rounded-none bg-[#FF4F00] font-black uppercase tracking-widest text-white shadow-2xl transition hover:brightness-110 active:scale-95">Connect Wallet</button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] font-sans transition-colors pb-12">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-900 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-[#FF4F00] text-white shadow-md transition hover:scale-105"><Logo size={20} /></a>
            <span className="hidden text-sm font-black tracking-[0.2em] uppercase text-slate-900 dark:text-white sm:block italic">QS.INIT</span>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <div className="hidden xs:flex flex-col items-end border-r border-slate-200 dark:border-slate-800 pr-3 sm:pr-4 mr-1 sm:mr-2 text-right">
              <span className="text-[8px] sm:text-[9px] font-black uppercase tracking-widest text-slate-400">Verified</span>
              <span className="text-[10px] sm:text-xs font-mono font-bold text-slate-600 dark:text-slate-300">{address.slice(0, 6)}...{address.slice(-4)}</span>
            </div>
            <button onClick={() => disconnect()} className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 transition hover:text-red-600"><LogOut size={18} /></button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8 space-y-8 sm:space-y-12">
            <section className="relative overflow-hidden rounded-none border-l-4 sm:border-l-8 border-[#FF4F00] bg-slate-900 p-6 sm:p-12 text-white shadow-2xl">
              <div className="relative z-10">
                <h2 className="flex items-center gap-2 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-4 sm:mb-6 italic">Portfolio v1.0</h2>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl sm:text-8xl lg:text-[7rem] font-black tracking-tighter leading-none">
                    {isPortfolioLoading ? <Loader2 className="animate-spin text-[#FF4F00]" size={48} /> : `$${totalValue.toFixed(2)}`}
                  </span>
                </div>
                <div className="mt-10 sm:mt-16 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
                  {!isPortfolioLoading && assetGroups.slice(0, 4).map((group, idx) => (
                    <div key={idx} className="border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-sm">
                      <p className="text-[8px] sm:text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 sm:mb-3">{group.symbol}</p>
                      <p className="text-lg sm:text-2xl font-black tracking-tighter truncate">{group.totalAmount.toFixed(1)}</p>
                      <p className="text-[9px] sm:text-[10px] font-bold text-[#FF4F00] uppercase italic mt-1">${group.totalValue.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -right-20 -bottom-20 opacity-5 pointer-events-none">
                 <Logo size={400} />
              </div>
            </section>

            <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
              <a href="/create" className="group flex flex-col justify-between border-2 border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 p-8 sm:p-10 transition hover:border-[#FF4F00] shadow-sm hover:shadow-2xl">
                <div>
                  <div className="mb-6 sm:mb-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center bg-[#FF4F00] text-white shadow-lg group-hover:rotate-12 transition-transform"><Plus size={32} strokeWidth={3} /></div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Create</h3>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Start a new social settlement on the MiniEVM.</p>
                </div>
                <div className="mt-8 sm:mt-12 flex items-center text-xs sm:text-sm font-black uppercase tracking-widest text-[#FF4F00]">Launch Contract <ChevronRight size={18} strokeWidth={3} className="ml-1" /></div>
              </a>
              <a href="/join" className="group flex flex-col justify-between border-2 border-slate-100 dark:border-slate-900 bg-white dark:bg-slate-900 p-8 sm:p-10 transition hover:border-[#FF4F00] shadow-sm hover:shadow-2xl">
                <div>
                  <div className="mb-6 sm:mb-10 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-lg group-hover:-rotate-12 transition-transform"><Search size={32} strokeWidth={3} /></div>
                  <h3 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tighter uppercase italic">Join</h3>
                  <p className="mt-2 sm:mt-4 text-sm sm:text-base text-slate-500 dark:text-slate-400 font-medium leading-relaxed">Enter an invite code to settle your share.</p>
                </div>
                <div className="mt-8 sm:mt-12 flex items-center text-xs sm:text-sm font-black uppercase tracking-widest text-slate-900 dark:text-white">Existing Code <ChevronRight size={18} strokeWidth={3} className="ml-1" /></div>
              </a>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-8 sm:space-y-12">
            <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h3 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-widest uppercase mb-8 sm:mb-10 italic">Activity</h3>
              <div className="space-y-6">
                {[
                  { title: 'Dinner at Nobu', owed: '$40', status: 'Pending' },
                  { title: 'Hackathon Snacks', owed: '$15', status: 'Settled' }
                ].map((split, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 dark:border-slate-800 last:border-0">
                    <div>
                       <div className="font-black text-xs sm:text-sm uppercase tracking-tight text-slate-900 dark:text-white">{split.title}</div>
                       <div className={`text-[8px] sm:text-[9px] font-black uppercase tracking-widest mt-1 ${split.status === 'Settled' ? 'text-emerald-500' : 'text-orange-500'}`}>{split.status}</div>
                    </div>
                    <div className="font-black text-base sm:text-lg tracking-tighter">{split.owed}</div>
                  </div>
                ))}
              </div>
              <div className="mt-10 sm:mt-12 p-4 sm:p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                 <div className="flex justify-between items-center mb-4">
                    <h4 className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em]">Karma XP</h4>
                    <span className="text-[8px] sm:text-[9px] font-black uppercase text-[#FF4F00] italic">Level 2</span>
                 </div>
                 <div className="h-1 w-full bg-slate-200 dark:bg-slate-700 rounded-none overflow-hidden">
                    <div className="h-full bg-[#FF4F00] w-2/3 shadow-[0_0_8px_rgba(255,79,0,0.5)]"></div>
                 </div>
              </div>
            </section>

            <a href="https://faucet.testnet.initia.xyz/" target="_blank" className="flex items-center justify-between p-6 sm:p-8 bg-[#FF4F00] text-white hover:brightness-110 transition-all shadow-2xl group">
               <div className="font-black uppercase tracking-widest text-base sm:text-lg italic text-white">Refill Account</div>
               <ChevronRight size={24} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </main>

      <footer className="mx-auto max-w-7xl px-6 py-12 border-t border-slate-100 dark:border-slate-900 flex flex-col sm:flex-row justify-between items-center gap-4 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
        <p>Built for Initiate 2026</p>
        <p className="italic uppercase">Aggregated Social Layer</p>
      </footer>
    </div>
  )
}
