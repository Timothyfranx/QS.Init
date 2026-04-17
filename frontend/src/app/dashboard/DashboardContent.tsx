'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useInterwovenKit, usePortfolio } from '@initia/interwovenkit-react'
import { 
  Plus, 
  Users, 
  ArrowUpRight, 
  History, 
  LayoutDashboard,
  Wallet,
  Globe,
  RefreshCw,
  LogOut,
  Zap
} from 'lucide-react'
import { Logo } from '@/components/Logo'
import { ThemeToggle } from '@/components/ThemeToggle'

export default function DashboardContent() {
  const router = useRouter()
  const { address, disconnect } = useInterwovenKit()
  const { totalValue, assetGroups, isLoading, refresh } = usePortfolio()
  const [activeTab, setActiveTab] = useState('overview')

  const truncateAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-4)}`
  }

  const handleDisconnect = () => {
    disconnect()
    router.push('/')
  }

  return (
    <div className="flex min-h-screen bg-black transition-colors duration-500 industrial-grid text-white">
      {/* SIDEBAR - REINFORCED */}
      <aside className="w-72 glass-sidebar hidden lg:flex flex-col z-50">
        <div className="p-10 border-b-2 border-primary/20 bg-primary/5">
          <div className="flex items-center gap-4">
             <Logo className="text-primary animate-pulse" size={32} />
             <span className="text-2xl font-black uppercase italic tracking-tighter">QS.INIT</span>
          </div>
        </div>
        
        <nav className="flex-grow p-6 space-y-4">
          {[
            { id: 'overview', icon: LayoutDashboard, label: 'Overview' },
            { id: 'splits', icon: Users, label: 'My Settlements' },
            { id: 'history', icon: History, label: 'History' },
            { id: 'assets', icon: Globe, label: 'Omni-Chain' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-6 py-4 font-black uppercase tracking-[0.2em] text-[10px] transition-all border-l-4
                ${activeTab === item.id 
                  ? 'bg-primary/20 border-primary text-white' 
                  : 'border-transparent hover:bg-white/5 text-slate-500 hover:text-white'}`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-6 border-t-2 border-primary/10">
          <button 
            onClick={handleDisconnect}
            className="w-full flex items-center gap-4 px-6 py-4 font-black uppercase tracking-[0.2em] text-[10px] text-red-500 hover:bg-red-500/20 transition-all border-l-4 border-transparent"
          >
            <LogOut size={18} />
            Term. Session
          </button>
        </div>
      </aside>

      {/* MAIN DASHBOARD AREA */}
      <main className="flex-grow flex flex-col p-8 lg:p-12 gap-12 overflow-y-auto relative">
        
        {/* TOP BAR - CLEAN & BOLD */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-10 border-b-4 border-primary/30">
          <div className="space-y-1">
            <h1 className="text-5xl font-black italic tracking-tighter">COMMAND CENTER</h1>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30">
                 <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                   {address ? truncateAddress(address) : 'CONNECTING...'}
                 </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
             <ThemeToggle />
             <button 
               onClick={() => router.push('/create')}
               className="btn-industrial flex items-center gap-4 px-10 h-16 text-sm"
             >
               <Plus size={24} strokeWidth={4} />
               NEW SPLIT
             </button>
          </div>
        </header>

        {/* STATS GRID - 3 COLUMN RIGID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           <div className="card-industrial bg-primary text-white border-none shadow-[0_0_50px_rgba(255,79,0,0.2)]">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-70 mb-6 block">Aggregated Value</span>
              <div className="flex items-baseline gap-3">
                 <span className="text-5xl font-black italic tracking-tighter leading-none">
                   {isLoading ? '...' : `$${totalValue?.toFixed(2) || '0.00'}`}
                 </span>
                 <span className="text-xs font-black opacity-50 uppercase tracking-widest">USD</span>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest opacity-60">
                 <Zap size={10} fill="currentColor" /> Live Portfolio Feed
              </div>
              <Wallet className="absolute -right-6 -bottom-6 w-32 h-32 opacity-10 pointer-events-none" />
           </div>

           <div className="card-industrial border-primary/30">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 block">Settlements</span>
              <div className="flex items-baseline gap-3">
                 <span className="text-5xl font-black italic tracking-tighter text-white">04</span>
                 <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Pending</span>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                 <Users size={10} /> Active Split Groups
              </div>
              <Users className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5 pointer-events-none" />
           </div>

           <div className="card-industrial border-primary/30">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-6 block">Omni-Nodes</span>
              <div className="flex items-center justify-between">
                 <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-black italic tracking-tighter text-white">
                      {isLoading ? '0' : assetGroups?.length || '0'}
                    </span>
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Chains</span>
                 </div>
                 <button onClick={() => refresh?.()} className="p-3 bg-white/5 hover:bg-primary/20 transition-colors">
                    <RefreshCw size={20} className={`${isLoading ? 'animate-spin text-primary' : 'text-slate-400'}`} />
                 </button>
              </div>
              <div className="mt-8 flex items-center gap-2 text-[8px] font-black uppercase tracking-widest text-slate-500">
                 <Globe size={10} /> Interwoven Status: Online
              </div>
              <Globe className="absolute -right-6 -bottom-6 w-32 h-32 opacity-5 pointer-events-none" />
           </div>
        </div>

        {/* CONTENT GRID - REINFORCED ALIGNMENT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           
           {/* PORTFOLIO DISTRIBUTION */}
           <div className="lg:col-span-8 space-y-8">
              <div className="flex items-center justify-between pb-4 border-b-2 border-primary/20">
                <h3 className="text-2xl font-black italic">OMNI-CHAIN ASSETS</h3>
                <div className="px-3 py-1 bg-primary/10 text-primary text-[8px] font-black uppercase tracking-[0.3em]">
                   Auto-Bridging Ready
                </div>
              </div>
              
              <div className="grid gap-4">
                {isLoading ? (
                  [1, 2, 3].map(i => <div key={i} className="h-24 bg-white/5 animate-pulse border-2 border-white/5"></div>)
                ) : assetGroups && assetGroups.length > 0 ? (
                  assetGroups.map((group, i) => (
                    <div key={i} className="card-industrial flex items-center justify-between group">
                       <div className="flex items-center gap-6">
                          <div className="w-14 h-14 bg-primary/10 border-2 border-primary/20 flex items-center justify-center font-black text-lg text-primary group-hover:bg-primary group-hover:text-white transition-all">
                             {group.symbol.slice(0, 2)}
                          </div>
                          <div>
                             <div className="font-black uppercase tracking-tight text-xl">{group.symbol}</div>
                             <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                               {group.assets[0]?.chain?.name || 'Omni-Node'}
                             </div>
                          </div>
                       </div>
                       <div className="text-right">
                          <div className="font-black text-2xl tracking-tighter">${group.value?.toFixed(2)}</div>
                          <div className="text-[10px] font-bold text-primary tracking-widest uppercase">
                            {group.amount?.toFixed(4)} {group.symbol}
                          </div>
                       </div>
                    </div>
                  ))
                ) : (
                  <div className="card-industrial text-center py-20 text-slate-500 italic border-dashed border-primary/10">
                    No fragmented balances detected in the interwoven world.
                  </div>
                )}
              </div>
           </div>

           {/* SIDE CONTENT: SPLITS & SWEEPER */}
           <div className="lg:col-span-4 flex flex-col gap-10">
              <div className="space-y-6">
                 <h3 className="text-2xl font-black italic pb-4 border-b-2 border-primary/20">RECENT SETTLEMENTS</h3>
                 <div className="card-industrial bg-white/5 flex flex-col items-center justify-center py-24 border-dashed border-primary/10">
                    <Users size={64} className="text-primary/20 mb-6" />
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">No active groups</p>
                    <button 
                     onClick={() => router.push('/create')}
                     className="mt-8 px-6 py-2 border border-primary/30 text-[10px] font-black text-primary uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                    >
                      INITIALIZE BILL
                    </button>
                 </div>
              </div>
              
              <div className="card-industrial bg-primary/5 border-primary/30 shadow-[0_0_30px_rgba(255,79,0,0.05)]">
                 <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary">AI SWEEPER ACTIVE</span>
                    <Zap size={18} className="text-primary animate-pulse" fill="currentColor" />
                 </div>
                 <p className="text-xs font-bold text-slate-400 leading-relaxed uppercase tracking-tighter">
                   AGENT IS SCANNING YOUR MINI-ROLLUP DUST TO SETTLE PENDING DEBTS AUTOMATICALLY.
                 </p>
                 <div className="mt-6 flex gap-2">
                    <div className="h-1 flex-grow bg-primary/40"></div>
                    <div className="h-1 w-4 bg-primary/20"></div>
                    <div className="h-1 w-2 bg-primary/10"></div>
                 </div>
              </div>
           </div>
        </div>
      </main>
    </div>
  )
}
