'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Users, 
  DollarSign,
  ChevronRight,
  Zap,
  CheckCircle2
} from 'lucide-react'
import { ThemeToggle } from '@/components/ThemeToggle'
import { Logo } from '@/components/Logo'

export default function CreateSplitContent() {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [totalAmount, setTotalAmount] = useState('')
  const [participants, setParticipants] = useState([''])

  const addParticipant = () => setParticipants([...participants, ''])
  
  const removeParticipant = (index: number) => {
    if (participants.length > 1) {
      const newParticipants = [...participants]
      newParticipants.splice(index, 1)
      setParticipants(newParticipants)
    }
  }

  const updateParticipant = (index: number, value: string) => {
    const newParticipants = [...participants]
    newParticipants[index] = value
    setParticipants(newParticipants)
  }

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault()
    // Mock ID for prototype
    const mockId = Math.random().toString(36).substring(2, 9).toUpperCase()
    router.push(`/split/${mockId}`)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] font-sans transition-colors pb-24">
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 sm:h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a href="/dashboard" className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-slate-900 dark:bg-[#FF4F00] text-white shadow-md transition hover:scale-105 active:scale-95"><Logo size={20} /></a>
            <span className="text-sm font-black tracking-[0.2em] uppercase text-slate-900 dark:text-white italic">Create</span>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8 sm:py-16">
        <motion.a 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          href="/dashboard" 
          className="group mb-8 inline-flex items-center gap-2 text-sm font-bold text-slate-400 transition hover:text-slate-900 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Dashboard
        </motion.a>

        <form onSubmit={handleCreate} className="space-y-6 sm:space-y-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-none border-l-4 sm:border-l-8 border-[#FF4F00] bg-white dark:bg-slate-900 p-8 sm:p-12 shadow-2xl"
          >
            <div className="mb-10 sm:mb-12">
               <h1 className="text-4xl sm:text-5xl font-black tracking-tighter text-slate-900 dark:text-white uppercase italic leading-none">New Split</h1>
               <p className="mt-4 text-slate-500 dark:text-slate-400 font-medium text-lg leading-relaxed">Define the outcome, we handle the settlement.</p>
            </div>

            <div className="space-y-8 sm:space-y-10">
              <div>
                <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Expense Title</label>
                <input 
                  type="text" 
                  required
                  placeholder="e.g. Weekend in Tokyo" 
                  className="w-full rounded-none border-b-2 border-slate-100 dark:border-slate-800 bg-transparent py-4 font-bold text-xl sm:text-2xl text-slate-900 dark:text-white focus:border-[#FF4F00] focus:outline-none transition-all placeholder:text-slate-200 dark:placeholder:text-slate-800"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              <div>
                <label className="mb-3 block text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Total Amount (USD)</label>
                <div className="relative">
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 text-2xl font-black text-[#FF4F00] opacity-50">$</span>
                  <input 
                    type="number" 
                    required
                    placeholder="0.00" 
                    className="w-full rounded-none border-b-2 border-slate-100 dark:border-slate-800 bg-transparent py-4 pl-6 font-black text-3xl sm:text-4xl text-slate-900 dark:text-white focus:border-[#FF4F00] focus:outline-none transition-all placeholder:text-slate-100 dark:placeholder:text-slate-800"
                    value={totalAmount}
                    onChange={e => setTotalAmount(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 sm:p-12 border border-slate-100 dark:border-slate-800 shadow-xl"
          >
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-xl font-black tracking-widest uppercase italic">Participants</h2>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-slate-100 dark:bg-slate-800 px-3 py-1 text-slate-400">{participants.length} total</span>
            </div>

            <div className="space-y-4">
              <AnimatePresence initial={false}>
                {participants.map((participant, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex gap-4"
                  >
                    <div className="relative flex-1">
                      <input 
                        type="text" 
                        required
                        placeholder={index === 0 ? "Your Initia Address" : "Participant Wallet Address"}
                        className={`w-full border-2 px-6 py-4 font-mono text-xs sm:text-sm font-bold transition-all focus:outline-none ${index === 0 ? 'bg-slate-50 dark:bg-slate-800 border-transparent text-slate-400' : 'bg-white dark:bg-slate-950 border-slate-100 dark:border-slate-800 text-slate-900 dark:text-white focus:border-[#FF4F00]'}`}
                        value={participant}
                        disabled={index === 0}
                        onChange={e => updateParticipant(index, e.target.value)}
                      />
                      {index === 0 && <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase tracking-[0.2em] text-[#FF4F00]">Admin</span>}
                    </div>
                    {index > 0 && (
                      <button 
                        type="button" 
                        onClick={() => removeParticipant(index)}
                        className="flex aspect-square w-14 items-center justify-center border-2 border-slate-100 dark:border-slate-800 text-slate-300 transition hover:border-red-500 hover:text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <button 
              type="button"
              onClick={addParticipant}
              className="mt-8 flex w-full items-center justify-center gap-3 border-2 border-dashed border-slate-200 dark:border-slate-800 py-4 text-xs font-black uppercase tracking-[0.2em] text-slate-400 transition hover:border-[#FF4F00] hover:text-[#FF4F00]"
            >
              <Plus size={16} strokeWidth={3} /> Add Participant
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
             <button 
               type="submit"
               className="h-24 w-full bg-slate-900 dark:bg-white text-white dark:text-black text-2xl font-black uppercase tracking-tighter transition hover:bg-[#FF4F00] hover:text-white dark:hover:bg-[#FF4F00] dark:hover:text-white active:scale-[0.98] shadow-2xl flex items-center justify-center gap-4 group"
             >
               Deploy to MiniEVM <ChevronRight size={28} strokeWidth={3} className="group-hover:translate-x-1 transition-transform" />
             </button>
             <div className="mt-6 flex justify-center gap-8 text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 px-4 text-center">
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#FF4F00]" /> Verified Contract</span>
                <span className="flex items-center gap-2"><CheckCircle2 size={12} className="text-[#FF4F00]" /> Cancun Standard</span>
             </div>
          </motion.div>
        </form>
      </main>
    </div>
  )
}
