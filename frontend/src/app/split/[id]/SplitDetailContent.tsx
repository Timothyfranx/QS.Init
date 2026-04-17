'use client'

import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { DustSweeper, TokenBalance } from '@/services/sweeper'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Zap, 
  Users, 
  CheckCircle2, 
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function SplitDetailContent() {
  const { id } = useParams()
  const kit = useInterwovenKit()
  const [isSweeping, setIsSweeping] = useState(false)
  const [balances, setBalances] = useState<TokenBalance[]>([])
  const [settled, setSettled] = useState(false)

  const sweeper = new DustSweeper()

  const splitData = {
    title: 'Dinner at Nobu',
    description: 'Shared sushi and drinks at the hackathon afterparty.',
    totalAmount: 240,
    amountOwed: 40,
    creator: '0x1234...5678',
    status: 'Active',
    participants: ['Alice', 'Bob', 'You', 'Dave']
  }

  useEffect(() => {
    if (kit.address) {
      sweeper.scanForDust(kit.address, ['mini-move-1', 'mini-wasm-2', 'mini-evm-3']).then(setBalances)
    }
  }, [kit.address])

  const { address, isConnected, openConnect } = kit

  const handleMagicPay = async () => {
    setIsSweeping(true)
    setTimeout(() => {
      setIsSweeping(false)
      setSettled(true)
    }, 4000)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans transition-colors">
       <header className="sticky top-0 z-50 w-full border-b border-slate-200/60 dark:border-slate-800 bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 dark:bg-orange-600 text-white shadow-md transition hover:scale-105 active:scale-95">
              <Zap size={20} fill="currentColor" />
            </a>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-slate-900 dark:text-white">Settlement</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-16">
        <motion.a initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} href="/dashboard" className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-slate-900 dark:hover:text-white">
          <ArrowLeft size={16} /> Back to Dashboard
        </motion.a>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[2.5rem] bg-white dark:bg-slate-900 p-6 shadow-2xl shadow-slate-200 dark:shadow-none border border-slate-100 dark:border-slate-800 sm:p-12">
          <div className="mb-8 flex justify-between items-center">
            <div className="flex items-center gap-2 rounded-full bg-slate-900 dark:bg-orange-600 px-3 py-1 text-white">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400"></div>
              <span className="text-[10px] font-black uppercase tracking-widest leading-none mt-0.5">{settled ? 'Settled' : splitData.status}</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter italic">Secured by MiniEVM</span>
          </div>

          <h1 className="text-3xl font-black tracking-tighter text-slate-900 dark:text-white sm:text-4xl">{splitData.title}</h1>
          <p className="mt-3 text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{splitData.description}</p>

          <div className="my-10 grid grid-cols-2 gap-8 py-8 border-y border-slate-50 dark:border-slate-800">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Total Amount</p>
              <p className="text-3xl font-black text-slate-900 dark:text-white">${splitData.totalAmount}</p>
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-600 mb-2">Your Share</p>
              <p className="text-3xl font-black text-orange-600">${splitData.amountOwed}</p>
            </div>
          </div>

          <div className="mb-10">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900 dark:text-white flex items-center gap-2">
                <Users size={14} /> Participants
              </h3>
              <span className="text-[10px] font-bold text-slate-400">{splitData.participants.length} total</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {splitData.participants.map(p => (
                <span key={p} className={`rounded-xl px-4 py-2 text-xs font-bold border transition-colors ${p === 'You' ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white" : "bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-100 dark:border-slate-700"}`}>
                  {p === 'You' ? '⭐️ You' : p}
                </span>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!settled ? (
              isConnected ? (
                <motion.button key="pay-button" whileTap={{ scale: 0.98 }} onClick={handleMagicPay} disabled={isSweeping} className={`group relative w-full overflow-hidden rounded-[1.5rem] py-5 text-lg font-black text-white shadow-2xl transition active:scale-[0.98] ${isSweeping ? "bg-slate-800 dark:bg-slate-800 cursor-not-allowed" : "bg-orange-600 hover:bg-orange-700"}`}>
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    {isSweeping ? (<><Loader2 size={20} className="animate-spin" /> AI Agent is Bridging...</>) : (<><Sparkles size={20} fill="white" /> Magic Pay with Sweeper</>)}
                  </div>
                </motion.button>
              ) : (
                <div className="rounded-3xl bg-slate-50 dark:bg-slate-800/30 p-8 text-center border border-slate-200 dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-6">Wallet connection required for settlement.</p>
                  <button onClick={() => openConnect()} className="rounded-2xl bg-slate-900 dark:bg-orange-600 px-10 py-3 text-sm font-black text-white shadow-lg transition hover:bg-slate-800">
                    Connect Wallet
                  </button>
                </div>
              )
            ) : (
              <motion.div key="success" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="rounded-3xl bg-emerald-500 p-8 text-center text-white shadow-2xl shadow-emerald-100 border border-emerald-400">
                <CheckCircle2 size={48} className="mx-auto mb-4" />
                <h3 className="text-2xl font-black tracking-tight">Split Settled</h3>
                <p className="mt-2 font-bold opacity-90">Debt paid using dust from 3 Minitias.</p>
                <button onClick={() => setSettled(false)} className="mt-8 inline-block rounded-xl bg-white/20 px-8 py-3 text-xs font-black uppercase tracking-widest hover:bg-white/30 transition-colors">
                  Done
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {balances.length > 0 && isConnected && !settled && (
          <motion.section initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-8 rounded-[2.5rem] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-300 dark:shadow-none border border-slate-800">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h4 className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                  <ShieldCheck size={14} className="text-emerald-400" /> Strategy Analysis
                </h4>
                <p className="mt-1 text-sm font-bold">Optimizing Multi-Chain Routes</p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-600 shadow-lg shadow-orange-900/50">
                <Zap size={18} fill="white" className="text-white" />
              </div>
            </div>
            <div className="space-y-3">
              {balances.map((b) => (
                <div key={b.chainId} className="flex items-center justify-between rounded-2xl bg-white/5 p-4 border border-white/5">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{b.chainId}</span>
                    <span className="text-sm font-bold text-slate-200">{b.amount/1000000} {b.denom.slice(1).toUpperCase()}</span>
                  </div>
                  <div className="text-right font-black text-emerald-400">${b.usdValue.toFixed(2)}</div>
                </div>
              ))}
              <div className="pt-6 mt-4 border-t border-white/10">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bridging Efficiency</span>
                  <span className="text-sm font-black text-white">99.8%</span>
                </div>
                <div className="rounded-2xl bg-white/5 p-5 border border-white/10">
                  <div className="flex items-start gap-4">
                    <AlertCircle size={18} className="text-orange-500 mt-1 flex-shrink-0" />
                    <p className="text-xs font-medium leading-relaxed text-slate-400">
                      Agent will batch bridge calls from <span className="text-white">Mini-Move, Mini-Wasm</span> and <span className="text-white">Mini-EVM</span> to settle your share.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </main>
      <footer className="py-12 text-center text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 italic">
        No manual gas calculation required · Agent Assisted
      </footer>
    </div>
  )
}
