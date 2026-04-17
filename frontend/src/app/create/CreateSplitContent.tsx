'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit } from '@initia/interwovenkit-react'
import { Plus, Users, ArrowRight, Wallet, Trash2 } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function CreateSplitContent() {
  const router = useRouter()
  const { address, isConnected, openConnect } = useInterwovenKit()
  const [participants, setParticipants] = useState<string[]>([''])
  const [amount, setAmount] = useState('')
  const [title, setTitle] = useState('')

  const addParticipant = () => setParticipants([...participants, ''])
  
  const removeParticipant = (index: number) => {
    const newParticipants = [...participants]
    newParticipants.splice(index, 1)
    setParticipants(newParticipants)
  }

  const updateParticipant = (index: number, val: string) => {
    const newParticipants = [...participants]
    newParticipants[index] = val
    setParticipants(newParticipants)
  }

  const handleCreate = async () => {
    if (!isConnected) {
      openConnect()
      return
    }
    // Logic for contract interaction would go here
    console.log("Creating split:", { title, amount, participants })
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black industrial-grid flex flex-col transition-colors duration-500">
      <nav className="h-20 glass border-b-2 border-primary/20 flex items-center px-6 fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
           <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 group">
              <Logo className="text-primary" size={32} />
              <span className="text-2xl font-black uppercase italic tracking-tighter">QS.INIT</span>
           </button>
           <div className="flex items-center gap-6">
              <ThemeToggle />
              <button onClick={() => router.push('/dashboard')} className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-primary">Exit</button>
           </div>
        </div>
      </nav>

      <main className="flex-grow pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto flex flex-col gap-12">
           <div className="flex flex-col gap-2">
              <h1 className="text-6xl font-black italic tracking-tighter uppercase">Initialize Split</h1>
              <div className="flex gap-4">
                 <div className="h-1 w-20 bg-primary"></div>
                 <div className="h-1 w-10 bg-primary/20"></div>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="card-industrial flex flex-col gap-8 bg-slate-50 dark:bg-slate-950">
                 <div className="relative group">
                    <input 
                      type="text" 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Dinner at Noma"
                      className="w-full bg-transparent border-b-2 border-slate-200 dark:border-primary/20 pt-8 pb-2 font-black uppercase tracking-widest text-xl focus:border-primary outline-none transition-all"
                    />
                    <span className="absolute left-0 top-2 text-[8px] font-black uppercase tracking-[0.3em] text-primary">Settlement Name</span>
                 </div>

                 <div className="relative group">
                    <input 
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full bg-transparent border-b-2 border-slate-200 dark:border-primary/20 pt-8 pb-2 font-black uppercase tracking-widest text-3xl focus:border-primary outline-none transition-all text-primary"
                    />
                    <span className="absolute left-0 top-2 text-[8px] font-black uppercase tracking-[0.3em] text-primary">Total Amount (USDC)</span>
                    <Wallet className="absolute right-0 bottom-3 text-slate-300 group-focus-within:text-primary transition-colors" size={24} />
                 </div>
              </div>

              <div className="flex flex-col gap-6">
                 <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-black italic uppercase">Participants</h3>
                    <button 
                      onClick={addParticipant}
                      className="p-2 bg-primary text-white hover:brightness-110 transition-all"
                    >
                      <Plus size={20} />
                    </button>
                 </div>

                 <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                    {participants.map((p, i) => (
                      <div key={i} className="flex gap-2 group">
                         <div className="relative flex-grow">
                            <input 
                              type="text"
                              value={p}
                              onChange={(e) => updateParticipant(i, e.target.value)}
                              placeholder="0x... or ENS"
                              className="w-full bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-primary/10 px-4 py-3 font-black uppercase tracking-tighter text-xs focus:border-primary outline-none"
                            />
                            {i === 0 && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[8px] font-black uppercase text-primary">Admin</span>}
                         </div>
                         {i > 0 && (
                           <button onClick={() => removeParticipant(i)} className="p-3 text-slate-400 hover:text-red-500 transition-colors">
                             <Trash2 size={16} />
                           </button>
                         )}
                      </div>
                    ))}
                 </div>
              </div>
           </div>

           <button 
             onClick={handleCreate}
             disabled={!title || !amount}
             className="btn-industrial h-24 flex items-center justify-between text-2xl group"
           >
             DEPLOY SETTLEMENT <ArrowRight size={36} strokeWidth={3} className="group-hover:translate-x-2 transition-transform" />
           </button>
        </div>
      </main>
    </div>
  )
}
